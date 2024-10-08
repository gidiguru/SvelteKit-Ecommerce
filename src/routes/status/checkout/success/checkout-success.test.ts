import { describe, it, expect, vi, beforeEach } from 'vitest';
import { error } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { actions, load } from './+page.server'; // Make sure this path is correct

vi.mock('@sveltejs/kit', async () => {
    const actual = await vi.importActual('@sveltejs/kit');
    return {
        ...actual,
        error: vi.fn((status, message) => { throw { status, message }; })
    };
});

vi.mock('$lib/server/stripe', () => ({
    stripe: {
        checkout: {
            sessions: {
                retrieve: vi.fn()
            }
        }
    }
}));

vi.mock('$lib/emails/purchase-thank-you', () => ({
    sendPurchaseThankYou: vi.fn()
}));

describe('Checkout Success Handler', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('actions', () => {
        it('should throw an error if session ID is missing', async () => {
            const request = {
                formData: vi.fn().mockResolvedValue(new FormData())
            };

            await expect(actions.default({ request, url: new URL('http://localhost') } as any))
                .rejects.toThrow('Missing session ID');
        });

        it('should process a successful purchase', async () => {
            const sessionId = 'test_session_id';
            const customerName = 'Test Customer';
            const customerEmail = 'test@example.com';

            const formData = new FormData();
            formData.append('session_id', sessionId);

            const request = {
                formData: vi.fn().mockResolvedValue(formData)
            };

            vi.mocked(stripe.checkout.sessions.retrieve).mockResolvedValue({
                customer_details: { name: customerName, email: customerEmail }
            } as any);

            const result = await actions.default({ request, url: new URL('http://localhost') } as any);

            expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith(sessionId);
            expect(sendPurchaseThankYou).toHaveBeenCalledWith(customerEmail, customerName);
            expect(result).toEqual({
                success: true,
                customerName: customerName
            });
        });

        it('should handle errors during purchase processing', async () => {
            const sessionId = 'test_session_id';
            const formData = new FormData();
            formData.append('session_id', sessionId);

            const request = {
                formData: vi.fn().mockResolvedValue(formData)
            };

            vi.mocked(stripe.checkout.sessions.retrieve).mockRejectedValue(new Error('Stripe error'));
            
            await expect(actions.default({ request, url: new URL('http://localhost') } as any))
                .rejects.toThrow('Failed to process purchase');

            expect(console.error).toHaveBeenCalledWith(
                'Error processing successful purchase:',
                expect.any(Error)
            );
            expect(vi.mocked(console.error).mock.calls[0][1].message).toBe('Stripe error');
        });
    });

    describe('load', () => {
        it('should return sessionId if present in URL', async () => {
            const url = new URL('http://localhost?session_id=test_session_id');
            const result = await load({ url } as any);

            expect(result).toEqual({ sessionId: 'test_session_id' });
        });

        it('should return an empty object if sessionId is not in URL', async () => {
            const url = new URL('http://localhost');
            const result = await load({ url } as any);

            expect(result).toEqual({});
        });
    });
});