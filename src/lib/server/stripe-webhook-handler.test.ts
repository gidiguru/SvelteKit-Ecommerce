import { describe, it, expect, vi, beforeEach } from 'vitest';
import type Stripe from 'stripe';
import { handleStripeWebhook } from './stripe-webhook-handler';
import { createNewOrder, createNewOrderProduct } from '../../lib/server/data/orders';
import { db } from '../../lib/server/db/index';
import { user } from '../../lib/server/db/schema';
import { sendPurchaseThankYou } from '../../lib/emails/purchase-thank-you';
import { eq } from 'drizzle-orm';

// Mock external dependencies
vi.mock('$lib/server/data/orders', () => ({
  createNewOrder: vi.fn(),
  createNewOrderProduct: vi.fn(),
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

vi.mock('$lib/server/db/schema', () => ({
  user: {},
}));

vi.mock('$lib/emails/purchase-thank-you', () => ({
  sendPurchaseThankYou: vi.fn(),
}));

vi.mock('drizzle-orm', () => ({
  eq: vi.fn(),
}));

describe('handleStripeWebhook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  const createMockSession = (overrides: Partial<Stripe.Checkout.Session> = {}): Partial<Stripe.Checkout.Session> => ({
    id: 'cs_test_123',
    object: 'checkout.session',
    metadata: {
      codes: JSON.stringify([{ quantity: 1, code: 'PROD123' }]),
      userId: 'user_123',
    },
    customer: 'cus_123',
    amount_total: 1000,
    customer_details: {
      email: 'test@example.com',
      name: 'Test User',
      address: {
        city: null,
        country: null,
        line1: null,
        line2: null,
        postal_code: null,
        state: null,
      },
      phone: null,
      tax_exempt: 'none',
      tax_ids: [],
    },
    payment_status: 'paid',
    status: 'complete',
    ...overrides,
  });

  it('should handle checkout.session.completed event', async () => {
    const mockEvent: Stripe.Event = {
      type: 'checkout.session.completed',
      data: {
        object: createMockSession(),
      },
    } as Stripe.Event;

    const result = await handleStripeWebhook(mockEvent);

    expect(result).toEqual({ received: true });
    expect(createNewOrder).toHaveBeenCalledWith({
      orderId: 'cs_test_123',
      customerId: 'cus_123',
      totalPrice: 1000,
    });
    expect(createNewOrderProduct).toHaveBeenCalledWith({
      productTypeCode: 'PROD123',
      quantity: 1,
      status: 'placed',
      orderId: 'cs_test_123',
    });
    expect(db.update).toHaveBeenCalled();
    expect(sendPurchaseThankYou).toHaveBeenCalledTimes(2);
    expect(sendPurchaseThankYou).toHaveBeenCalledWith('test@example.com', 'Test User');
  });

  it('should handle event with missing metadata', async () => {
    const mockEvent: Stripe.Event = {
      type: 'checkout.session.completed',
      data: {
        object: createMockSession({ metadata: undefined }),
      },
    } as Stripe.Event;

    const result = await handleStripeWebhook(mockEvent);

    expect(result).toEqual({ received: true });
    expect(createNewOrder).not.toHaveBeenCalled();
    expect(createNewOrderProduct).not.toHaveBeenCalled();
    expect(db.update).not.toHaveBeenCalled();
    expect(sendPurchaseThankYou).toHaveBeenCalledTimes(1); // Only the test email should be sent
  });

  it('should handle event with missing customer details', async () => {
    const mockEvent: Stripe.Event = {
      type: 'checkout.session.completed',
      data: {
        object: createMockSession({ customer_details: undefined }),
      },
    } as Stripe.Event;

    const result = await handleStripeWebhook(mockEvent);

    expect(result).toEqual({ received: true });
    expect(createNewOrder).toHaveBeenCalled();
    expect(createNewOrderProduct).toHaveBeenCalled();
    expect(db.update).toHaveBeenCalled();
    expect(sendPurchaseThankYou).toHaveBeenCalledTimes(1); // Only the test email should be sent
  });

  it('should handle unhandled event type', async () => {
    const mockEvent: Stripe.Event = {
      type: 'payment_intent.succeeded',
      data: {
        object: {},
      },
    } as Stripe.Event;

    const result = await handleStripeWebhook(mockEvent);

    expect(result).toEqual({ received: true });
    expect(createNewOrder).not.toHaveBeenCalled();
    expect(createNewOrderProduct).not.toHaveBeenCalled();
    expect(db.update).not.toHaveBeenCalled();
    expect(sendPurchaseThankYou).toHaveBeenCalledTimes(1); // Only the test email should be sent
  });

  it('should handle error in sendPurchaseThankYou', async () => {
    vi.mocked(sendPurchaseThankYou).mockRejectedValue(new Error('Email sending failed'));

    const mockEvent: Stripe.Event = {
      type: 'checkout.session.completed',
      data: {
        object: createMockSession(),
      },
    } as Stripe.Event;

    const result = await handleStripeWebhook(mockEvent);

    expect(result).toEqual({ received: true });
    expect(createNewOrder).toHaveBeenCalled();
    expect(createNewOrderProduct).toHaveBeenCalled();
    expect(db.update).toHaveBeenCalled();
    expect(sendPurchaseThankYou).toHaveBeenCalledTimes(2); // Both calls should be made
    expect(console.error).toHaveBeenCalledWith(
      'Error sending purchase thank you email:',
      expect.any(Error)
    );
  });
});