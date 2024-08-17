import { e as ensureAdmin } from "../../../../chunks/auth.js";
import { d as db, o as order } from "../../../../chunks/index.js";
import { s as stripe } from "../../../../chunks/stripe.js";
import { P as Paystack } from "../../../../chunks/paystack.js";
import { e as error } from "../../../../chunks/index2.js";
import { desc, eq } from "drizzle-orm";
import { zfd } from "zod-form-data";
function isValidPaymentGateway(gateway) {
  return gateway === "stripe" || gateway === "paystack";
}
const load = async ({ locals }) => {
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
  const sendOrders = [];
  for (const order2 of orders) {
    try {
      if (!isValidPaymentGateway(order2.paymentGateway)) {
        throw new Error(`Invalid payment gateway: ${order2.paymentGateway}`);
      }
      let customerInfo = null;
      if (order2.paymentGateway === "stripe" && order2.gatewayOrderId) {
        const session = await stripe.checkout.sessions.retrieve(order2.gatewayOrderId);
        customerInfo = session.customer_details || null;
      } else if (order2.paymentGateway === "paystack" && order2.gatewayOrderId) {
        const transaction = await Paystack.transaction.verify(order2.gatewayOrderId);
        customerInfo = transaction.data.customer;
      }
      sendOrders.push({
        id: order2.id,
        timestamp: order2.timestamp,
        userId: order2.userId,
        totalPrice: order2.totalPrice,
        currency: order2.currency,
        status: order2.status,
        paymentGateway: order2.paymentGateway,
        gatewayOrderId: order2.gatewayOrderId,
        customerInfo,
        products: order2.products.map((p) => ({
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
      console.error(`Error processing order ${order2.id}:`, err);
    }
  }
  return { orders: sendOrders };
};
function isOrderStatus(status) {
  return ["new", "placed", "packaged", "sent"].includes(status);
}
const actions = {
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
      throw error(400, "invalid status");
    }
    await db.update(order).set({
      status: res.data.status
    }).where(eq(order.id, res.data.orderId));
    return { success: true };
  }
};
export {
  actions,
  load
};
