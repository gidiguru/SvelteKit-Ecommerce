import { createNewOrder, createNewOrderProduct } from '$lib/server/data/orders';
import { db } from '$lib/server/db/index';
import { user } from '$lib/server/db/schema';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { stripe } from '$lib/server/stripe';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

function toBuffer(ab: ArrayBuffer): Buffer {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
        buf[i] = view[i];
    }
    return buf;
}

export const POST = async ({ request }: { request: Request }) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
        console.error('Missing Stripe webhook secret');
        return error(500, 'Server configuration error');
    }

    const _rawBody = await request.arrayBuffer();
    const payload = toBuffer(_rawBody);

    // Get the signature sent by Stripe
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return error(400, 'Missing stripe-signature header');
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    } catch (err) {
        console.error(`⚠️  Webhook signature verification failed.`, err);
        return error(400, 'Invalid signature');
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
                break;
            // Add other event types as needed
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (err) {
        console.error(`Error processing webhook: ${event.type}`, err);
        return error(500, 'Error processing webhook');
    }

    return json({ received: true });
};

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const sessionWithCustomer = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['customer']
    });

    if (!sessionWithCustomer.metadata) {
        console.error('No metadata found in the session');
        return;
    }

    const codes = JSON.parse(sessionWithCustomer.metadata.codes) as {
        quantity: number;
        code: string;
    }[];

    const customer = sessionWithCustomer.customer as Stripe.Customer | null;
    const userId = sessionWithCustomer.metadata.userId as string;

    if (customer && userId) {
        await db
            .update(user)
            .set({
                stripeCustomerId: customer.id
            })
            .where(eq(user.id, userId));
    }

    await createNewOrder({
        orderId: sessionWithCustomer.id,
        customerId: customer?.id ?? null,
        totalPrice: sessionWithCustomer.amount_total ?? 0
    });

    for (const code of codes) {
        await createNewOrderProduct({
            productSizeCode: code.code,
            quantity: code.quantity,
            status: 'placed',
            orderId: sessionWithCustomer.id
        });
    }

    if (sessionWithCustomer.customer_details?.email) {
        await sendPurchaseThankYou(
            sessionWithCustomer.customer_details.email,
            sessionWithCustomer.customer_details.email
        );
    }
}