//import { env } from '$env/dynamic/private';
import Stripe from 'stripe';
import dotenv from 'dotenv'

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
