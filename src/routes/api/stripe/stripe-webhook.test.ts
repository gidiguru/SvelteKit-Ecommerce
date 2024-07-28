import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './+server';
import { stripe } from '$lib/server/stripe';
import { db } from '$lib/server/db/index';
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { user } from '$lib/server/db/schema';

// Mock external dependencies
vi.mock('$lib/server/stripe', () => ({
  stripe: {
    webhooks: {
      constructEvent: vi.fn(),
    },
    checkout: {
      sessions: {
        retrieve: vi.fn(),
      },
    },
  },
}));

vi.mock('$lib/server/db/index', () => ({
  db: {
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(),
      })),
    })),
  },
}));

vi.mock('$lib/emails/purchase-thank-you', () => ({
  sendPurchaseThankYou: vi.fn(),
}));

vi.mock('$lib/server/db/schema', () => ({
  user: {},
}));

describe('Stripe Webhook Handler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = 'test_secret';
  });

  it('should handle a valid checkout.session.completed event', async () => {
    // Mock Stripe event
    const mockEvent = {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_1234',
        },
      },
    };

    // Mock session data
    const mockSession = {
      id: 'cs_test_1234',
      metadata: {
        codes: JSON.stringify([{ quantity: 1, code: 'TEST123' }]),
        userId: 'user_1234',
      },
      customer: { id: 'cus_1234' },
      amount_total: 1000,
      customer_details: {
        email: 'test@example.com',
        name: 'Test User',
      },
    };

    // Set up mocks
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(mockEvent as any);
    vi.mocked(stripe.checkout.sessions.retrieve).mockResolvedValue(mockSession as any);

    // Mock request object
    const request = {
      method: 'POST',
      headers: {
        get: vi.fn().mockReturnValue('test_signature'),
      },
      arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
    };

    // Call the webhook handler
    const response = await POST({ request } as any);
    const responseData = await response.json();

    // Assertions
    expect(responseData).toEqual({ received: true });
    expect(stripe.webhooks.constructEvent).toHaveBeenCalled();
    expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith('cs_test_1234', { expand: ['customer'] });
    expect(db.update).toHaveBeenCalled();
    expect(sendPurchaseThankYou).toHaveBeenCalledWith('test@example.com', 'Test User');
  });

  it('should handle missing webhook secret', async () => {
    // Remove the webhook secret from environment
    delete process.env.STRIPE_WEBHOOK_SECRET;

    const request = {
      method: 'POST',
      headers: {
        get: vi.fn().mockReturnValue('test_signature'),
      },
      arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
    };

    // Expect the function to throw an error
    await expect(POST({ request } as any)).rejects.toThrow('Missing Stripe webhook secret');
  });
});