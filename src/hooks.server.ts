import { lucia } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get the session ID from the cookie
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		// No session ID, so no authenticated user
		event.locals.user = null;
		event.locals.session = null;
	} else {
		// Validate the session
		const { session, user } = await lucia.validateSession(sessionId);

		if (session && session.fresh) {
			// Session is valid and fresh, set a new session cookie
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else if (!session) {
			// Invalid session, clear the cookie
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}

		// Set user and session in event.locals
		event.locals.user = user;
		event.locals.session = session;
	}

	// Add auth methods to event.locals
	event.locals.auth = {
		validate: async () => {
			if (event.locals.session) {
				return { session: event.locals.session, user: event.locals.user };
			}
			return null;
		},
		setSession: async (newSession: typeof event.locals.session) => {
			event.locals.session = newSession;
			event.locals.user = newSession ? await event.locals.user : null;
			if (newSession) {
				const sessionCookie = lucia.createSessionCookie(newSession.id);
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
			} else {
				const sessionCookie = lucia.createBlankSessionCookie();
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
			}
		}
	};

	// Resolve the request
	return resolve(event);
};