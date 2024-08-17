import { ensureAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { order, orderProduct, product, productType } from '$lib/server/db/schema';
import { stripe } from '$lib/server/stripe';
import { Paystack } from '$lib/server/paystack';
import { error } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import type Stripe from 'stripe';
import { zfd } from 'zod-form-data';
import type { PaystackCustomer } from '$lib/server/paystack'; // Import the new type

// Define a union type for valid payment gateways
type PaymentGateway = 'stripe' | 'paystack';	


// Update the OrderDetails interface
interface OrderDetails {
    id: string;
    timestamp: Date;
    userId: string;
    totalPrice: number;
    currency: string;
    status: 'new' | 'placed' | 'packaged' | 'sent';
    paymentGateway: PaymentGateway;
    gatewayOrderId: string | null;
    customerInfo: Stripe.Checkout.Session.CustomerDetails | PaystackCustomer | null;
    products: {
        id: string;
        productId: string;
        productTypeId: string;
        quantity: number;
        priceAtOrder: number;
        currencyAtOrder: string;
        productName: string;
        typeName: string;
    }[];
}

// Update the isValidPaymentGateway function
function isValidPaymentGateway(gateway: string): gateway is PaymentGateway {
    return gateway === 'stripe' || gateway === 'paystack';
}

// Update the load function
export const load = async ({ locals }) => {
    ensureAdmin(locals);

    const orders = await db.query.order.findMany({
        orderBy: desc(order.timestamp),
        with: {
            products: {
                with: {
                    productType: {
                        with: {
                            product: true
                        }
                    }
                }
            }
        }
    });

    const sendOrders: OrderDetails[] = [];

    for (const order of orders) {
        try {
            if (!isValidPaymentGateway(order.paymentGateway)) {
                throw new Error(`Invalid payment gateway: ${order.paymentGateway}`);
            }

            let customerInfo: Stripe.Checkout.Session.CustomerDetails | PaystackCustomer | null = null;

            if (order.paymentGateway === 'stripe' && order.gatewayOrderId) {
                const session = await stripe.checkout.sessions.retrieve(order.gatewayOrderId);
                customerInfo = session.customer_details || null;
            } else if (order.paymentGateway === 'paystack' && order.gatewayOrderId) {
                const transaction = await Paystack.transaction.verify(order.gatewayOrderId);
                customerInfo = transaction.data.customer;
            }

            sendOrders.push({
                id: order.id,
                timestamp: order.timestamp,
                userId: order.userId,
                totalPrice: order.totalPrice,
                currency: order.currency,
                status: order.status,
                paymentGateway: order.paymentGateway,
                gatewayOrderId: order.gatewayOrderId,
                customerInfo,
                products: order.products.map(p => ({
                    id: p.id,
                    productId: p.productType.product.id,
                    productTypeId: p.productTypeId,
                    quantity: p.quantity,
                    priceAtOrder: p.priceAtOrder,
                    currencyAtOrder: p.currencyAtOrder,
                    productName: p.productType.product.name,
                    typeName: p.productType.name
                }))
            });
        } catch (err) {
            console.error(`Error processing order ${order.id}:`, err);
        }
    }

    return { orders: sendOrders };
};

function isOrderStatus(status: string): status is 'new' | 'placed' | 'packaged' | 'sent' {
    return ['new', 'placed', 'packaged', 'sent'].includes(status);
}

export const actions = {
    setStatus: async ({ locals, request }) => {
        ensureAdmin(locals);

        const data = await request.formData();

        const schema = zfd.formData({
            orderId: zfd.text(),
            status: zfd.text()
        });

        const res = schema.safeParse(data);

        if (!res.success) {
            throw error(400, res.error.name);
        }

        if (!isOrderStatus(res.data.status)) {
            throw error(400, 'invalid status');
        }

        await db
            .update(order)
            .set({
                status: res.data.status
            })
            .where(eq(order.id, res.data.orderId));

        return { success: true };
    }
};