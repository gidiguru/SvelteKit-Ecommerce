import { c as createNewOrder, a as createNewOrderProduct } from "../../../../chunks/orders.js";
import { d as db, u as user } from "../../../../chunks/index.js";
import { s as sendPurchaseThankYou } from "../../../../chunks/purchase-thank-you.js";
import { s as stripe } from "../../../../chunks/stripe.js";
import { e as error, j as json } from "../../../../chunks/index2.js";
import { eq } from "drizzle-orm";
import dotenv__default from "dotenv";
dotenv__default.config();
function toBuffer(ab) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; i++) {
    buf[i] = view[i];
  }
  return buf;
}
const POST = async ({ request }) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
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
            productTypeCode: codes[i].code,
            quantity: codes[i].quantity,
            status: "placed",
            orderId: sessionWithCustomer.id
          });
        }
        if (sessionWithCustomer.customer_details?.email) {
          await sendPurchaseThankYou(sessionWithCustomer.customer_details.email, sessionWithCustomer.customer_details.email);
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
