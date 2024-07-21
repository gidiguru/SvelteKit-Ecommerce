import { s as stripe } from "../../../chunks/stripe.js";
import { r as redirect, e as error } from "../../../chunks/index.js";
import { track } from "@vercel/analytics/server";
const actions = {
  default: async (event) => {
    const body = await event.request.json();
    const user = event.locals.user;
    const customerId = user ? user.stripeCustomerId ?? void 0 : void 0;
    const total = body.reduce((prev, curr) => {
      return {
        ...prev,
        size: {
          ...prev.size,
          price: prev.size.price + curr.size.price * curr.quantity
        }
      };
    }).size.price / 100;
    const line_items = [
      ...body.map((item) => {
        return {
          price: item.size.stripePriceId,
          quantity: item.quantity
        };
      })
    ];
    if (total < 125) {
      line_items.push({
        price_data: {
          currency: "USD",
          product_data: {
            name: "US Shipping"
          },
          unit_amount: 1500
        },
        quantity: 1
      });
    }
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["US"]
      },
      line_items,
      customer: customerId,
      customer_creation: user && !customerId ? "always" : void 0,
      customer_update: customerId ? {
        shipping: "auto"
      } : void 0,
      metadata: {
        codes: JSON.stringify(
          body.map((item) => ({
            quantity: item.quantity,
            code: item.size.code
          }))
        ),
        userId: user ? user.id : ""
      },
      mode: "payment",
      success_url: `${event.url.origin}/status/checkout/success`,
      cancel_url: `${event.url.origin}/status/checkout/fail`,
      automatic_tax: { enabled: true },
      billing_address_collection: "required"
    });
    if (session.url) {
      await track("StartedCheckout", { total });
      redirect(307, session.url);
    }
    error(500);
  }
};
export {
  actions
};
