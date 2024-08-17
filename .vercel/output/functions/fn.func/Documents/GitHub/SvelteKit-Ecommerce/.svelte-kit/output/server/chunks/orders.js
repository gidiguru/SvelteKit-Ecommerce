import { generateId } from "lucia";
import { d as db, o as order, a as orderProduct } from "./index.js";
const createNewOrder = async (data) => {
  await db.insert(order).values({
    stripeOrderId: data.orderId,
    stripeCustomerId: data.customerId,
    totalPrice: data.totalPrice,
    timestamp: /* @__PURE__ */ new Date()
  });
  return data.orderId;
};
const createNewOrderProduct = async (data) => {
  const id = generateId(20);
  await db.insert(orderProduct).values({ ...data, id });
  return id;
};
export {
  createNewOrderProduct as a,
  createNewOrder as c
};
