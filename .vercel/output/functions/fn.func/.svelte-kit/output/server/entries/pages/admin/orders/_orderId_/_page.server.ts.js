import { e as ensureAdmin } from "../../../../../chunks/auth.js";
import { d as db, o as order } from "../../../../../chunks/index2.js";
import { s as stripe } from "../../../../../chunks/stripe.js";
import { e as error } from "../../../../../chunks/index.js";
import { eq, desc } from "drizzle-orm";
import { zfd } from "zod-form-data";
const load = async ({ locals, params }) => {
  ensureAdmin(locals);
  const orderDB = await db.query.order.findFirst({
    where: eq(order.stripeOrderId, params.orderId),
    orderBy: desc(order.timestamp),
    with: {
      products: true
    }
  });
  if (!orderDB) {
    error(404, "Order not found...");
  }
  const session = await stripe.checkout.sessions.retrieve(orderDB.stripeOrderId);
  if (!session.customer_details) {
    error(404, "Customer not found...");
  }
  const sendOrder = {
    stripeCustomerId: orderDB.stripeCustomerId,
    stripeOrderId: orderDB.stripeOrderId,
    timestamp: orderDB.timestamp,
    totalPrice: orderDB.totalPrice,
    customerInfo: session.customer_details,
    status: orderDB.status,
    email: session.customer_details.email ?? "",
    products: orderDB.products
  };
  return { order: sendOrder };
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
