import { createNewOrder, createNewOrderProduct } from '$lib/server/data/orders';
import { db } from '$lib/server/db/index';
import { user } from '$lib/server/db/schema';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;

function verifyPaystackSignature(payload: Buffer, signature: string): boolean {
    const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
                       .update(payload)
                       .digest('hex');
    return hash === signature;
}

export const POST = async ({ request }: { request: any }) => {
    const paystackSignature = request.headers.get('x-paystack-signature') ?? '';
    const payload = await request.arrayBuffer();
    const payloadBuffer = Buffer.from(payload);

    if (!verifyPaystackSignature(payloadBuffer, paystackSignature)) {
        console.log(`⚠️  Paystack signature verification failed.`);
        throw error(400, 'Invalid signature');
    }

    const event = JSON.parse(payloadBuffer.toString());

    if (event.event === 'charge.success') {
        const { data } = event;
        const transactionId = data.id;

        // Fetch transaction details from Paystack API
        const transactionDetails = await axios.get(
            `https://api.paystack.co/transaction/${transactionId}`,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
                }
            }
        );

        const { data: transactionData } = transactionDetails.data;

        if (transactionData.metadata) {
            const codes = JSON.parse(transactionData.metadata.codes) as {
                quantity: number;
                code: string;
            }[];

            const customerId = transactionData.customer.id;
            const userId = transactionData.metadata.userId as string;

            if (userId !== '') {
                await db
                    .update(user)
                    .set({
                        paystackCustomerId: customerId
                    })
                    .where(eq(user.id, userId));
            }

            await createNewOrder({
                orderId: transactionId,
                customerId: customerId,
                totalPrice: transactionData.amount
            });

            for (let i = 0; i < codes.length; i++) {
                await createNewOrderProduct({
                    productTypeCode: codes[i].code,
                    quantity: codes[i].quantity,
                    status: 'placed',
                    orderId: transactionId
                });
            }

            if (transactionData.customer.email) {
                await sendPurchaseThankYou(transactionData.customer.email, transactionData.customer.email);
            }
        }
    }

    return json({ success: true });
};