import type Stripe from 'stripe';
import { createNewOrder, createNewOrderProduct } from '$lib/server/data/orders';
import { db } from '$lib/server/db/index';
import { user } from '$lib/server/db/schema';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { eq } from 'drizzle-orm';

export async function handleStripeWebhook(event: Stripe.Event): Promise<{ received: boolean }> {
    const eventType = event.type;
    console.log(`Event type: ${eventType}`);

    // Always send test email
    try {
        await sendPurchaseThankYou('tomijoguno@gmail.com', 'Jogun Ogedengbe');
        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email:', error);
    }

    if (eventType === 'checkout.session.completed') {
        try {
            await handleCheckoutSessionCompleted(event);
        } catch (error) {
            console.error('Error handling checkout session completed:', error);
            // We log the error but don't re-throw it to ensure the webhook always returns success
        }
    } else {
        console.log(`Unhandled event type: ${eventType}`);
    }

    return { received: true };
}

async function handleCheckoutSessionCompleted(event: Stripe.Event): Promise<void> {
    console.log('Checkout session completed event received');
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('Session retrieved:', JSON.stringify(session, null, 2));

    if (!session.metadata) {
        console.log('No session metadata found');
        return;
    }

    console.log('Session metadata found');
    let codes: { quantity: number; code: string }[];
    try {
        codes = JSON.parse(session.metadata.codes);
    } catch (error) {
        console.error('Error parsing codes from metadata:', error);
        return;
    }

    const customer = session.customer as Stripe.Customer | string | null;
    const customerId = typeof customer === 'object' ? customer?.id : customer;

    if (customerId) {
        console.log('Customer found:', customerId);
        const userId = session.metadata.userId as string;
        if (userId) {
            try {
                await db.update(user)
                    .set({ stripeCustomerId: customerId })
                    .where(eq(user.id, userId));
                console.log('User updated with Stripe customer ID');
            } catch (error) {
                console.error('Error updating user with Stripe customer ID:', error);
            }
        }
    }

    try {
        await createNewOrder({
            orderId: session.id,
            customerId: customerId ?? null,
            totalPrice: session.amount_total ?? 0
        });
        console.log('New order created');

        for (const code of codes) {
            await createNewOrderProduct({
                productSizeCode: code.code,
                quantity: code.quantity,
                status: 'placed',
                orderId: session.id
            });
        }
        console.log('Order products created');
    } catch (error) {
        console.error('Error creating order or order products:', error);
        // We don't re-throw this error to ensure the webhook continues processing
    }

    if (session.customer_details?.email) {
        console.log('Customer email found:', session.customer_details.email);
        const customerName = session.customer_details.name || 'Valued Customer';
        try {
            await sendPurchaseThankYou(
                session.customer_details.email,
                customerName
            );
            console.log(`Purchase thank you email sent to ${session.customer_details.email}`);
        } catch (emailError) {
            console.error('Error sending purchase thank you email:', emailError);
            // We log the error but don't re-throw it
        }
    } else {
        console.log('No customer email available for sending purchase thank you');
    }
}