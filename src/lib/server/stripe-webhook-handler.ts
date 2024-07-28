import type Stripe from 'stripe';
import { createNewOrder, createNewOrderProduct } from '$lib/server/data/orders';
import { db } from '$lib/server/db/index';
import { user } from '$lib/server/db/schema';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { eq } from 'drizzle-orm';

export async function handleStripeWebhook(event: Stripe.Event): Promise<{ received: boolean }> {
    const eventType = event.type;
    console.log(`Event type: ${eventType}`);

    if (eventType === 'checkout.session.completed') {
        return handleCheckoutSessionCompleted(event);
    } else {
        console.log(`Unhandled event type: ${eventType}`);
    }

    return { received: true };
}

async function handleCheckoutSessionCompleted(event: Stripe.Event): Promise<{ received: boolean }> {
    console.log('Checkout session completed event received');
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('Session retrieved:', JSON.stringify(session, null, 2));

    // Test email send
    try {
        await sendPurchaseThankYou('test@example.com', 'Test Customer');
        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email:', error);
    }

    if (session.metadata) {
        console.log('Session metadata found');
        const codes = JSON.parse(session.metadata.codes) as {
            quantity: number;
            code: string;
        }[];

        const customer = session.customer as Stripe.Customer | string | null;
        const customerId = typeof customer === 'object' ? customer?.id : customer;

        if (customerId) {
            console.log('Customer found:', customerId);
            const userId = session.metadata.userId as string;
            if (userId !== '') {
                await db
                    .update(user)
                    .set({
                        stripeCustomerId: customerId
                    })
                    .where(eq(user.id, userId));
                console.log('User updated with Stripe customer ID');
            }
        }

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

        console.log('Customer details:', JSON.stringify(session.customer_details, null, 2));
        
        if (session.customer_details?.email) {
            console.log('Customer email found:', session.customer_details.email);
            const customerName = session.customer_details.name || 'Valued Customer';
            try {
                console.log('Attempting to send purchase thank you email');
                await sendPurchaseThankYou(
                    session.customer_details.email,
                    customerName
                );
                console.log(`Purchase thank you email sent to ${session.customer_details.email}`);
            } catch (emailError) {
                console.error('Error sending purchase thank you email:', emailError);
                console.error('Error details:', JSON.stringify(emailError, null, 2));
            }
        } else {
            console.log('No customer email available for sending purchase thank you');
        }
    } else {
        console.log('No session metadata found');
    }

    return { received: true };
}