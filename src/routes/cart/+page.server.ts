import type { TCartEntry } from '$lib/client/cart.js';
import { stripe } from '$lib/server/stripe';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import type Stripe from 'stripe';
import { track } from '@vercel/analytics/server';

export const actions: Actions = {
    default: async ({ request, url, locals }) => {
        console.log('Starting checkout process');
        try {
            const formData = await request.formData();
            const cartJson = formData.get('cart');
            
            if (typeof cartJson !== 'string') {
                console.log('Invalid cart data received');
                return { success: false, message: 'Invalid cart data' };
            }

            const body = JSON.parse(cartJson) as TCartEntry[];
            console.log('Parsed cart data:', body);

            if (body.length === 0) {
                console.log('Cart is empty');
                return { success: false, message: 'Cart is empty' };
            }

            const user = locals.user;
            const customerId = user?.stripeCustomerId ?? undefined;
            console.log('User info:', { user: !!user, customerId });

            // Calculate total price
            const total = body.reduce((sum, item) => sum + (item.productType.price * item.quantity) / 100, 0);
            console.log('Calculated total:', total);

            const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = body.map((item) => ({
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: item.productName,
                        description: `${item.productType.width}" x ${item.productType.height}"`
                    },
                    unit_amount: item.productType.price
                },
                quantity: item.quantity
            }));

            if (total < 125) {
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
                console.log('Added shipping to line items');
            }

            console.log('Creating Stripe checkout session');
            const sessionResult = await Promise.race([
                stripe.checkout.sessions.create({
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
                                code: item.productType.sku
                            }))
                        ),
                        userId: user?.id ?? ''
                    },
                    mode: 'payment',
                    success_url: `${url.origin}/status/checkout/success?clear_cart=true`,
                    cancel_url: `${url.origin}/status/checkout/fail`,
                    automatic_tax: { enabled: true },
                    billing_address_collection: 'required'
                }),
                new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Stripe API timeout')), 30000))
            ]) as Stripe.Checkout.Session;

            if (sessionResult.url) {
                await track('StartedCheckout', { total });
                console.log('Checkout session created, redirecting to:', sessionResult.url);
                return { success: true, url: sessionResult.url };
            }

            console.log('Failed to create checkout session');
            return { success: false, message: 'Failed to create checkout session' };
        } catch (err: unknown) {
            console.error('Checkout error:', err);
            
            if (err instanceof Error) {
                if (err.message === 'Stripe API timeout') {
                    return { success: false, message: 'The checkout process timed out. Please try again.' };
                }
                
                if ('code' in err && err.code === 'ECONNRESET') {
                    return { success: false, message: 'The connection was reset. Please try again.' };
                }
                
                console.error('Error message:', err.message);
            }
            
            return { success: false, message: 'An error occurred during checkout. Please try again.' };
        }
    }
};