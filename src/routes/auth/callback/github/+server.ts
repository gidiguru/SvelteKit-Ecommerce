import { github, lucia } from '$lib/server/auth';
import { OAuth2RequestError } from 'arctic';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	const storedState = event.cookies.get('github_oauth_state') ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const existingUser = await db.query.user.findFirst({
			where: and(eq(user.provider, 'github'), eq(user.providerId, githubUser.id))
		});

		let userId: string;

		if (existingUser) {
			userId = existingUser.id;
		} else {
			const githubEmailResponse = await fetch('https://api.github.com/user/emails', {
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`
				}
			});

			const githubEmails: GitHubEmail[] = await githubEmailResponse.json();

			const primaryEmail = githubEmails.find((entry) => entry.primary);
			if (!primaryEmail) {
				return new Response('No primary email found', { status: 400 });
			}

			// Handle cases where name might be null
			let firstName = '';
			let lastName = '';
			if (githubUser.name) {
				const nameParts = githubUser.name.split(' ');
				firstName = nameParts[0] ?? '';
				lastName = nameParts.slice(1).join(' ') ?? '';
			}

			userId = generateId(40);
			await db.insert(user).values({
				id: userId,
				provider: 'github',
				providerId: githubUser.id,
				email: primaryEmail.email,
				firstName,
				lastName,
				isAdmin: false,
				stripeCustomerId: null
			});
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		console.error('Unexpected error during GitHub OAuth:', e);
		return new Response(null, {
			status: 500
		});
	}
}

type GitHubUser = {
	id: string;
	login: string;
	avatar_url: string;
	name: string | null;
};

type GitHubEmail = {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: string | null;
};