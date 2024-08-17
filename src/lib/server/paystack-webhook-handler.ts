import crypto from 'crypto';
import { createNewOrder, createNewOrderProduct } from '$lib/server/data/orders';
import { db } from '$lib/server/db/index';
import { user } from '$lib/server/db/schema';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { eq } from 'drizzle-orm';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
    console.error('PAYSTACK_SECRET_KEY is not set in the environment variables');
    process.exit(1);
}

function verifyPaystackSignature(payload: string, signature: string): boolean {
    if (!PAYSTACK_SECRET_KEY) {
        throw new Error('PAYSTACK_SECRET_KEY is not set');
    }
    const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
                       .update(payload)
                       .digest('hex');
    return hash === signature;
}

export async function handlePaystackWebhook(request: Request): Promise<Response> {
    const payload = await request.text();
    const paystackSignature = request.headers.get('x-paystack-signature');

    if (!paystackSignature) {
        return new Response('Paystack signature is missing', { status: 400 });
    }

    try {
        if (!verifyPaystackSignature(payload, paystackSignature)) {
            return new Response('Invalid Paystack signature', { status: 400 });
        }
    } catch (err) {
        console.error('Error verifying Paystack signature:', err);
        return new Response('Error verifying Paystack signature', { status: 500 });
    }

    const event = JSON.parse(payload);

    if (event.event === 'charge.success') {
        const { data } = event;

        try {
            // Create new order
            await createNewOrder({
                orderId: data.reference,
                customerId: data.customer.id,
                totalPrice: data.amount // Paystack amount is in kobo
            });

            // Process order items
            if (data.metadata && data.metadata.items) {
                const items = JSON.parse(data.metadata.items);
                for (const item of items) {
                    await createNewOrderProduct({
                        orderId: data.reference,
                        productTypeCode: item.productId, // Assuming productId is equivalent to productTypeCode
                        quantity: item.quantity,
                        status: 'placed'
                    });
                }
            }

            // Update user with Paystack customer ID if not already set
            if (data.metadata && data.metadata.userId) {
                await db
                    .update(user)
                    .set({
                        paystackCustomerId: data.customer.id
                    })
                    .where(eq(user.id, data.metadata.userId));
            }

            // Send thank you email
            if (data.customer.email) {
                await sendPurchaseThankYou(data.customer.email, data.customer.email);
            }

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            console.error('Error processing Paystack webhook:', err);
            return new Response('Error processing webhook', { status: 500 });
        }
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}