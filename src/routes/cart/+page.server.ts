import type { TCartEntry } from '$lib/client/cart.js';
// Remove this line as we're not using clearCart directly here
// import type { clearCart } from '$lib/client/cart.js';
import { stripe } from '$lib/server/stripe';
import { error, redirect } from '@sveltejs/kit';
import type Stripe from 'stripe';
import { track } from '@vercel/analytics/server';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';

export const actions = {
    default: async ({request, url, locals}) => {
        const body = (await request.json()) as TCartEntry[];

        const user = locals.user;

        const customerId = user ? user.stripeCustomerId ?? undefined : undefined;

        // Calculate total price
        const total = body.reduce((prev, curr) => {
            return {
                ...prev,
                size: {
                    ...prev.size,
                    price: prev.size.price + curr.size.price * curr.quantity
                }
            };
        }).size.price / 100;

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            ...body.map((item) => {
                return {
                    price: item.size.stripePriceId,
                    quantity: item.quantity
                };
            })
        ];

        if (total < 125) {
            // add shipping to total
            line_items.push({
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: 'US Shipping'
                    },
                    unit_amount: 1500
                },
                quantity: 1
            });
        }

        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['US']
            },
            line_items,
            customer: customerId,
            customer_creation: user && !customerId ? 'always' : undefined,
            customer_update: customerId
                ? {
                    shipping: 'auto'
                  }
                : undefined,
            metadata: {
                codes: JSON.stringify(
                    body.map((item) => ({
                        quantity: item.quantity,
                        code: item.size.code
                    }))
                ),
                userId: user ? user.id : ''
            },
            mode: 'payment',
            success_url: `${url.origin}/status/checkout/success?clear_cart=true`, // Added query parameter
            cancel_url: `${url.origin}/status/checkout/fail`,
            automatic_tax: { enabled: true },
            billing_address_collection: 'required'
        });

        if (session.url) {
            await track('StartedCheckout', { total });
            redirect(307, session.url);
        }

        // TODO: make these errors not suck
        error(500);
    }
};