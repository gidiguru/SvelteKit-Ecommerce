import Stripe from "stripe";
import dotenv__default from "dotenv";
dotenv__default.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export {
  stripe as s
};
