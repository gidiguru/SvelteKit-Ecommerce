//import { env } from '$env/dynamic/private';
import { createNewOrder, createNewOrderProduct } from '$lib/server/data/orders';
import { db } from '$lib/server/db/index';
import { user } from '$lib/server/db/schema';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { stripe } from '$lib/server/stripe';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config()


function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i];
	}
	return buf;
}

export const POST = async ({ request }: { request: any }) => {
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

	const _rawBody = await request.arrayBuffer();
	const payload = toBuffer(_rawBody);

	// Get the signature sent by Stripe
	const signature = request.headers.get('stripe-signature') ?? '';
	try {
		const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
		const eventType = event.type;

		if (eventType === 'checkout.session.completed') {
			const sessionWithCustomer = await stripe.checkout.sessions.retrieve(event.data.object.id, {
				expand: ['customer']
			});

			if (sessionWithCustomer.metadata) {
				const codes = JSON.parse(sessionWithCustomer.metadata.codes) as {
					quantity: number;
					code: string;
				}[];

				const customer = sessionWithCustomer.customer as Stripe.Customer | null;
				if (customer) {
					// add customer to user
					const userId = sessionWithCustomer.metadata.userId as string;
					if (userId !== '') {
						await db
							.update(user)
							.set({
								stripeCustomerId: customer.id
							})
							.where(eq(user.id, userId));
					}
				}

				await createNewOrder({
					orderId: sessionWithCustomer.id,
					customerId: customer?.id ?? null,
					totalPrice: sessionWithCustomer.amount_total ?? 0
				});

				for (let i = 0; i < codes.length; i++) {
					await createNewOrderProduct({
						productSizeCode: codes[i].code,
						quantity: codes[i].quantity,
						status: 'placed',
						orderId: sessionWithCustomer.id
					});
				}

				if (sessionWithCustomer.customer_details?.email) {
					await sendPurchaseThankYou(sessionWithCustomer.customer_details.email, sessionWithCustomer.customer_details.email);
				}
			}
		}
	} catch (err) {
		console.log(`⚠️  Webhook signature verification failed.`, err);
		error(500);
	}

	return json({ success: true });
};