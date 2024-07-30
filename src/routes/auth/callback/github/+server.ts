import { github, lucia } from '$lib/server/auth';
import { OAuth2RequestError } from 'arctic';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';

// Import the specific types from your schema
//import type { NewUser } from '$lib/server/db/schema';

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

		console.log('GitHub User Data:', JSON.stringify(githubUser, null, 2));

		const existingUser = await db.query.user.findFirst({
			where: and(eq(user.provider, 'github'), eq(user.providerId, githubUser.id))
		});

		let userId: string;

		if (existingUser) {
			userId = existingUser.id;
			console.log('Existing user found:', existingUser);
		} else {
			const githubEmailResponse = await fetch('https://api.github.com/user/emails', {
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`
				}
			});

			const githubEmails: GitHubEmail[] = await githubEmailResponse.json();
			console.log('GitHub Emails:', JSON.stringify(githubEmails, null, 2));

			const primaryEmail = githubEmails.find((entry) => entry.primary);
			if (!primaryEmail) {
				console.error('No primary email found');
				return new Response('No primary email found', { status: 400 });
			}

			let firstName = (githubUser.name ? githubUser.name.split(' ')[0] : githubUser.login).substring(0, 100);
			let lastName = (githubUser.name ? githubUser.name.split(' ').slice(1).join(' ') : '').substring(0, 100);

			userId = generateId(40);
			const newUser: NewUser = {
				id: userId,
				provider: 'github',
				providerId: githubUser.id.substring(0, 255),
				email: primaryEmail.email.substring(0, 100),
				firstName,
				lastName,
				isAdmin: false,
				stripeCustomerId: null
			};
			console.log('Attempting to insert new user:', JSON.stringify(newUser, null, 2));

			try {
				await db.insert(user).values(newUser);
				console.log('New user inserted successfully');
			} catch (dbError) {
				console.error('Error inserting new user:', dbError);
				return new Response('Error creating user', { status: 500 });
			}
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
			console.error('OAuth2RequestError:', e);
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