
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { handleStripeWebhook } from '$lib/server/stripe-webhook-handler';
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

export const POST: RequestHandler = async ({ request }) => {
    console.log('Webhook received');
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!endpointSecret) {
        console.error('Missing Stripe webhook secret');
        throw error(500, 'Missing Stripe webhook secret');
    }

    const _rawBody = await request.arrayBuffer();
    const payload = toBuffer(_rawBody);

    // Get the signature sent by Stripe
    const signature = request.headers.get('stripe-signature') ?? '';
    
    try {
        const result = await handleStripeWebhook(payload, signature, endpointSecret);
        return json(result);
    } catch (err) {
        console.error(`Error processing webhook:`, err);
        throw error(400, 'Webhook processing failed');
    }
};