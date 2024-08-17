import { c as createNewOrder, a as createNewOrderProduct } from "../../../../chunks/orders.js";
import { d as db, u as user } from "../../../../chunks/index.js";
import { s as sendPurchaseThankYou } from "../../../../chunks/purchase-thank-you.js";
import { e as error, j as json } from "../../../../chunks/index2.js";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import dotenv__default from "dotenv";
import axios from "axios";
dotenv__default.config();
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
function verifyPaystackSignature(payload, signature) {
  const hash = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(payload).digest("hex");
  return hash === signature;
}
const POST = async ({ request }) => {
  const paystackSignature = request.headers.get("x-paystack-signature") ?? "";
  const payload = await request.arrayBuffer();
  const payloadBuffer = Buffer.from(payload);
  if (!verifyPaystackSignature(payloadBuffer, paystackSignature)) {
    console.log(`⚠️  Paystack signature verification failed.`);
    throw error(400, "Invalid signature");
  }
  const event = JSON.parse(payloadBuffer.toString());
  if (event.event === "charge.success") {
    const { data } = event;
    const transactionId = data.id;
    const transactionDetails = await axios.get(
      `https://api.paystack.co/transaction/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    );
    const { data: transactionData } = transactionDetails.data;
    if (transactionData.metadata) {
      const codes = JSON.parse(transactionData.metadata.codes);
      const customerId = transactionData.customer.id;
      const userId = transactionData.metadata.userId;
      if (userId !== "") {
        await db.update(user).set({
          paystackCustomerId: customerId
        }).where(eq(user.id, userId));
      }
      await createNewOrder({
        orderId: transactionId,
        customerId,
        totalPrice: transactionData.amount
      });
      for (let i = 0; i < codes.length; i++) {
        await createNewOrderProduct({
          productTypeCode: codes[i].code,
          quantity: codes[i].quantity,
          status: "placed",
          orderId: transactionId
        });
      }
      if (transactionData.customer.email) {
        await sendPurchaseThankYou(transactionData.customer.email, transactionData.customer.email);
      }
    }
  }
  return json({ success: true });
};
export {
  POST
};
