import { e as error, j as json } from "../../../../chunks/index2.js";
import { s as stripe } from "../../../../chunks/stripe.js";
import { generateId } from "lucia";
import { d as db, o as order, h as orderProduct, u as user } from "../../../../chunks/index.js";
import { Resend } from "resend";
import * as dotenv from "dotenv";
import dotenv__default from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
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
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
path.dirname(__filename);
function createEmailHtml(name) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sediment Art: Thank you for your Order!</title>
        <style>
            body {
                font-family: sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f6f6f6;
            }
            .container {
                background-color: white;
                margin: auto;
                padding: 8px;
            }
            .inner-container {
                border: 1px solid #eaeaea;
                border-radius: 4px;
                margin: 40px auto;
                padding: 20px;
                max-width: 465px;
            }
            .logo {
                display: block;
                margin: 32px auto 0;
                width: 300px;
                height: 102px;
            }
            .text {
                color: black;
                font-size: 14px;
                line-height: 24px;
            }
            .signature {
                color: black;
                font-size: 12px;
                line-height: 4px;
                padding-top: 16px;
            }
            .signature.italic {
                font-style: italic;
            }
            .hr {
                border: none;
                border-top: 1px solid #eaeaea;
                margin: 26px 0;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="inner-container">
                <hr class="hr">
                <h1 style="text-align: center; color: #333;">Sediment Art: Thank you for your order!</h1>
                <hr class="hr">
                
                <img 
                    src="https://res.cloudinary.com/insiderviz/image/upload/f_auto,q_auto/ly9xqkjkn8rat1l3lxex" 
                    alt="Sediment Art" 
                    class="logo"
                >
                
                <p class="text">Thank you for ordering, ${name}!</p>

                <p class="text">
                    You are one of the very first (among the first 10) to order from us, and we could not
                    be more grateful. We have included for free an exclusive piece from a currently
                    unreleased collection that will be sent with your order.
                </p>
                
                <p class="text">
                    We're thrilled to be getting one of our pieces in your hands. We'll keep you updated
                    as we get your order fulfilled.
                </p>
                
                <p class="text">
                    Remember that our pieces are made to order, so expect at least a week before your's
                    arrives.
                </p>
                
                <p class="text">
                    We use Fracture for our fulfillment, so your package will arrive in Fracture
                    packaging, as they have the best systems in place for keeping your glass pristine!
                </p>

                <p class="text">
                    For inquiries, reach us at 
                    <a href="mailto:joguno@petraton.com">joguno@petraton.com</a>
                </p>

                <p class="signature">Best,</p>
                <p class="signature" style="margin-left: 4px;">Jogun Ogedengbe</p>
                <p class="signature italic" style="margin-left: 4px;">Synergetics Shop Team</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
async function sendPurchaseThankYou(to, name) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const html = createEmailHtml(name);
    const { data, error: error2 } = await resend.emails.send({
      from: "Jogun <joguno@petraton.com>",
      to,
      subject: "Thank you for your Order",
      html
    });
    if (error2) {
      console.error("Error sending email:", error2);
    } else {
      console.log("Email sent successfully:", data);
    }
  } catch (error2) {
    console.error("Error in sendEmail:", error2 instanceof Error ? error2.message : String(error2));
  }
}
async function handleStripeWebhook(event) {
  const eventType = event.type;
  console.log(`Event type: ${eventType}`);
  try {
    await sendPurchaseThankYou("tomijoguno@gmail.com", "Jogun Ogedengbe");
    console.log("Test email sent successfully");
  } catch (error2) {
    console.error("Error sending test email:", error2);
  }
  if (eventType === "checkout.session.completed") {
    try {
      await handleCheckoutSessionCompleted(event);
    } catch (error2) {
      console.error("Error handling checkout session completed:", error2);
    }
  } else {
    console.log(`Unhandled event type: ${eventType}`);
  }
  return { received: true };
}
async function handleCheckoutSessionCompleted(event) {
  console.log("Checkout session completed event received");
  const session = event.data.object;
  console.log("Session retrieved:", JSON.stringify(session, null, 2));
  if (!session.metadata) {
    console.log("No session metadata found");
    return;
  }
  console.log("Session metadata found");
  let codes;
  try {
    codes = JSON.parse(session.metadata.codes);
  } catch (error2) {
    console.error("Error parsing codes from metadata:", error2);
    return;
  }
  const customer = session.customer;
  const customerId = typeof customer === "object" ? customer?.id : customer;
  if (customerId) {
    console.log("Customer found:", customerId);
    const userId = session.metadata.userId;
    if (userId) {
      try {
        await db.update(user).set({ stripeCustomerId: customerId }).where(eq(user.id, userId));
        console.log("User updated with Stripe customer ID");
      } catch (error2) {
        console.error("Error updating user with Stripe customer ID:", error2);
      }
    }
  }
  try {
    await createNewOrder({
      orderId: session.id,
      customerId: customerId ?? null,
      totalPrice: session.amount_total ?? 0
    });
    console.log("New order created");
    for (const code of codes) {
      await createNewOrderProduct({
        productTypeCode: code.code,
        quantity: code.quantity,
        status: "placed",
        orderId: session.id
      });
    }
    console.log("Order products created");
  } catch (error2) {
    console.error("Error creating order or order products:", error2);
  }
  if (session.customer_details?.email) {
    console.log("Customer email found:", session.customer_details.email);
    const customerName = session.customer_details.name || "Valued Customer";
    try {
      await sendPurchaseThankYou(
        session.customer_details.email,
        customerName
      );
      console.log(`Purchase thank you email sent to ${session.customer_details.email}`);
    } catch (emailError) {
      console.error("Error sending purchase thank you email:", emailError);
    }
  } else {
    console.log("No customer email available for sending purchase thank you");
  }
}
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
  console.log("Webhook received");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    console.error("Missing Stripe webhook secret");
    throw error(500, "Missing Stripe webhook secret");
  }
  const _rawBody = await request.arrayBuffer();
  const payload = toBuffer(_rawBody);
  const signature = request.headers.get("stripe-signature") ?? "";
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    const result = await handleStripeWebhook(event);
    return json(result);
  } catch (err) {
    console.error(`Error processing webhook:`, err);
    throw error(400, "Webhook processing failed");
  }
};
export {
  POST
};
