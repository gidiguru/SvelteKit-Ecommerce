import { p as private_env } from "./shared-server.js";
import Stripe from "stripe";
const stripe = new Stripe(private_env.STRIPE_SECRET_KEY);
export {
  stripe as s
};
