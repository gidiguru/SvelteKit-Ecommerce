import { e as ensureAdmin } from "../../../../../chunks/auth.js";
import { d as db, o as order } from "../../../../../chunks/index.js";
import { s as stripe } from "../../../../../chunks/stripe.js";
import { e as error } from "../../../../../chunks/index2.js";
import { eq } from "drizzle-orm";
import { zfd } from "zod-form-data";
import { p as paystack } from "../../../../../chunks/paystack.js";
function isValidPaymentGateway(gateway) {
  return gateway === "stripe" || gateway === "paystack";
}
const load = async ({ locals, params }) => {
  ensureAdmin(locals);
  const orderDB = await db.query.order.findFirst({
    where: eq(order.id, params.orderId),
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
  if (!orderDB) {
    throw error(404, "Order not found...");
  }
  if (!isValidPaymentGateway(orderDB.paymentGateway)) {
    throw error(400, "Invalid payment gateway");
  }
  let customerDetails = null;
  try {
    if (orderDB.paymentGateway === "stripe" && orderDB.gatewayOrderId) {
      const session = await stripe.checkout.sessions.retrieve(orderDB.gatewayOrderId);
      customerDetails = session.customer_details || null;
    } else if (orderDB.paymentGateway === "paystack" && orderDB.gatewayOrderId) {
      const transaction = await fetchPaystackTransaction(orderDB.gatewayOrderId);
      customerDetails = transaction.customer;
    }
    const sendOrder = {
      id: orderDB.id,
      timestamp: orderDB.timestamp,
      userId: orderDB.userId,
      totalPrice: orderDB.totalPrice,
      currency: orderDB.currency,
      status: orderDB.status,
      paymentGateway: orderDB.paymentGateway,
      gatewayOrderId: orderDB.gatewayOrderId,
      customerDetails,
      products: orderDB.products.map((p) => ({
        id: p.id,
        productId: p.productType.product.id,
        productTypeId: p.productTypeId,
        quantity: p.quantity,
        priceAtOrder: p.priceAtOrder,
        currencyAtOrder: p.currencyAtOrder,
        productName: p.productType.product.name,
        typeName: p.productType.name
      }))
    };
    return { order: sendOrder };
  } catch (err) {
    console.error("Error processing order:", err);
    throw error(500, "Error processing order");
  }
};
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
function isOrderStatus(status) {
  return ["new", "placed", "packaged", "sent"].includes(status);
}
async function fetchPaystackTransaction(transactionId) {
  try {
    const response = await paystack.verifyTransaction(transactionId);
    return response.data;
  } catch (error2) {
    console.error("Error fetching Paystack transaction:", error2);
    throw new Error("Failed to fetch Paystack transaction");
  }
}
export {
  actions,
  load
};
