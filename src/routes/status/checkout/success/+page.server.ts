import { error } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';

export const actions = {
    default: async ({ request, url }) => {
        const data = await request.formData();
        const sessionId = data.get('session_id') as string | null;

        if (!sessionId) {
            throw error(400, 'Missing session ID');
        }

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            const customerEmail = session.customer_details?.email;
            const customerName = session.customer_details?.name;

            if (customerEmail && customerName) {
                await sendPurchaseThankYou(customerEmail, customerName);
            }

            return {
                success: true,
                customerName: customerName || 'Customer'
            };
        } catch (err) {
            console.error('Error processing successful purchase:', err);
            throw error(500, 'Failed to process purchase');
        }
    }
};

export const load = async ({ url }) => {
    const sessionId = url.searchParams.get('session_id');
    if (sessionId) {
        return {
            sessionId
        };
    }
    return {};
};