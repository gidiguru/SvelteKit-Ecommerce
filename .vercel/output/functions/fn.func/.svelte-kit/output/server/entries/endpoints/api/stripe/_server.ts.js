import { p as private_env } from "../../../../chunks/shared-server.js";
import { generateId } from "lucia";
import { d as db, o as order, h as orderProduct, u as user } from "../../../../chunks/index2.js";
import { a as sendThankYouPurchaseEmail } from "../../../../chunks/resend.js";
import { s as stripe } from "../../../../chunks/stripe.js";
import { e as error, j as json } from "../../../../chunks/index.js";
import { eq } from "drizzle-orm";
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
function toBuffer(ab) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; i++) {
    buf[i] = view[i];
  }
  return buf;
}
const POST = async ({ request }) => {
  const endpointSecret = private_env.STRIPE_WEBHOOK_SECRET;
  const _rawBody = await request.arrayBuffer();
  const payload = toBuffer(_rawBody);
  const signature = request.headers.get("stripe-signature") ?? "";
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    const eventType = event.type;
    if (eventType === "checkout.session.completed") {
      const sessionWithCustomer = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ["customer"]
      });
      if (sessionWithCustomer.metadata) {
        const codes = JSON.parse(sessionWithCustomer.metadata.codes);
        const customer = sessionWithCustomer.customer;
        if (customer) {
          const userId = sessionWithCustomer.metadata.userId;
          if (userId !== "") {
            await db.update(user).set({
              stripeCustomerId: customer.id
            }).where(eq(user.id, userId));
          }
        }
        await createNewOrder({
          orderId: sessionWithCustomer.id,
          customerId: customer?.id ?? null,
          totalPrice: sessionWithCustomer.amount_total ?? 0
        });
        for (let i = 0; i < codes.length; i++) {
          await createNewOrderProduct({
            productSizeCode: codes[i].code,
            quantity: codes[i].quantity,
            status: "placed",
            orderId: sessionWithCustomer.id
          });
        }
        if (sessionWithCustomer.customer_details?.email) {
          await sendThankYouPurchaseEmail(sessionWithCustomer.customer_details.email);
        }
      }
    }
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err);
    error(500);
  }
  return json({ success: true });
};
export {
  POST
};
