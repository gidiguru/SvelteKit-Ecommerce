import dotenv from 'dotenv'
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { redirect } from '@sveltejs/kit';
import { GitHub, Google } from 'arctic';
import { Lucia } from 'lucia';
import { db } from './db';
import { session, user } from './db/schema';

dotenv.config();

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

function getRequiredEnvVar(name: string): string {
	const value = process.env[name];
	if (!value) {
	  throw new Error(`Missing required environment variable: ${name}`);
	}
	return value;
  }

  const GITHUB_CLIENT_ID = getRequiredEnvVar('GITHUB_CLIENT_ID');
  const GITHUB_CLIENT_SECRET = getRequiredEnvVar('GITHUB_CLIENT_SECRET');
  const GOOGLE_CLIENT_ID = getRequiredEnvVar('GOOGLE_CLIENT_ID');
  const GOOGLE_CLIENT_SECRET = getRequiredEnvVar('GOOGLE_CLIENT_SECRET');

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:5173';

const redirectUrl = `${baseUrl}/auth/callback/google`;



export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrl);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production'
		}
	},
	getUserAttributes: (data) => {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			isAdmin: data.isAdmin,
			stripeCustomerId: data.stripeCustomerId
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			firstName: string;
			lastName: string;
			isAdmin: boolean;
			email: string;
			stripeCustomerId: string | null;
		};
	}
}

export function ensureAdmin(locals: App.Locals) {
	if (!locals.user || !locals.session) {
		redirect(303, '/auth/signin');
	}

	if (!locals.user.isAdmin) {
		redirect(303, '/');
	}
}
