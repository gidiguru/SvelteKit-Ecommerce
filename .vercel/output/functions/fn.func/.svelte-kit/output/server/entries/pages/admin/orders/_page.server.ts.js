import { e as ensureAdmin } from "../../../../chunks/auth.js";
import { d as db, o as order } from "../../../../chunks/index2.js";
import { s as stripe } from "../../../../chunks/stripe.js";
import { e as error } from "../../../../chunks/index.js";
import { desc, eq } from "drizzle-orm";
import { zfd } from "zod-form-data";
const load = async ({ locals }) => {
  ensureAdmin(locals);
  const orders = await db.query.order.findMany({
    orderBy: desc(order.timestamp),
    with: {
      products: true
    }
  });
  const sendOrders = [];
  for (let i = 0; i < orders.length; i++) {
    const order2 = orders[i];
    const session = await stripe.checkout.sessions.retrieve(order2.stripeOrderId);
    if (session.customer_details) {
      sendOrders.push({
        stripeCustomerId: order2.stripeCustomerId,
        stripeOrderId: order2.stripeOrderId,
        timestamp: order2.timestamp,
        totalPrice: order2.totalPrice,
        customerInfo: session.customer_details,
        status: order2.status,
        email: session.customer_details.email ?? "",
        products: order2.products
      });
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
      stripeOrderId: zfd.text(),
      status: zfd.text()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      error(400, res.error.name);
    }
    if (!isOrderStatus(res.data.status)) {
      error(400, "invalid status");
    }
    await db.update(order).set({
      status: res.data.status
    }).where(eq(order.stripeOrderId, res.data.stripeOrderId));
    return { success: true };
  }
};
export {
  actions,
  load
};
