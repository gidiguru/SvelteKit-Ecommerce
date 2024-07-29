import type Stripe from 'stripe';
import { stripe } from '$lib/server/stripe';
import { createNewOrder, createNewOrderProduct } from '$lib/server/data/orders';
import { db } from '$lib/server/db/index';
import { user } from '$lib/server/db/schema';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { eq } from 'drizzle-orm';

export async function handleStripeWebhook(
    event: Stripe.Event, 
    signature?: string, 
    rawBody?: string
): Promise<{ received: boolean }> {
    console.log(`Received webhook: ${event.id}, Type: ${event.type}`);

    // Always send test email
    try {
        await sendPurchaseThankYou('test@example.com', 'Test Customer');
    } catch (error) {
        console.error('Error sending test email:', error);
    }

    // Only verify signature if all required parameters are provided
    if (signature && rawBody) {
        try {
            const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
            if (!endpointSecret) {
                throw new Error('STRIPE_WEBHOOK_SECRET is not set');
            }
            stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
        } catch (err) {
            console.error('⚠️  Webhook signature verification failed:', err);
            return { received: false };
        }
    }

    try {
        if (event.type === 'checkout.session.completed') {
            await handleCheckoutSessionCompleted(event);
        } else {
            console.log(`Unhandled event type: ${event.type}`);
        }
    } catch (error) {
        console.error('Error handling event:', error);
    }

    return { received: true };
}

async function handleCheckoutSessionCompleted(event: Stripe.Event): Promise<void> {
    console.log('Processing checkout.session.completed event');
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.metadata) {
        console.warn('No session metadata found');
        return;
    }

    let codes: { quantity: number; code: string }[];
    try {
        codes = JSON.parse(session.metadata.codes);
    } catch (error) {
        console.error('Error parsing codes from metadata:', error);
        return;
    }

    const customer = session.customer as Stripe.Customer | string | null;
    const customerId = typeof customer === 'object' ? customer?.id : customer;

    if (customerId && session.metadata.userId) {
        try {
            await db.update(user)
                .set({ stripeCustomerId: customerId })
                .where(eq(user.id, session.metadata.userId));
            console.log('User updated with Stripe customer ID');
        } catch (error) {
            console.error('Error updating user with Stripe customer ID:', error);
        }
    }

    try {
        await createNewOrder({
            orderId: session.id,
            customerId: customerId ?? null,
            totalPrice: session.amount_total ?? 0
        });

        for (const code of codes) {
            await createNewOrderProduct({
                productSizeCode: code.code,
                quantity: code.quantity,
                status: 'placed',
                orderId: session.id
            });
        }
        console.log('Order and order products created successfully');
    } catch (error) {
        console.error('Error creating order or order products:', error);
    }

    if (session.customer_details?.email) {
        const customerName = session.customer_details.name || 'Valued Customer';
        try {
            await sendPurchaseThankYou(
                session.customer_details.email,
                customerName
            );
            console.log(`Purchase thank you email sent to ${session.customer_details.email}`);
        } catch (emailError) {
            console.error('Error sending purchase thank you email:', emailError);
        }
    } else {
        console.warn('No customer email available for sending purchase thank you');
    }
}