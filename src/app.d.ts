// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// <reference types="lucia" />
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}

	namespace Lucia {
		type Auth = import('$lib/server/auth').Auth;
		type DatabaseUserAttributes = {
			firstName: string;
			lastName: string;
			email: string;
			isAdmin: boolean;
			// Add any other user attributes here
		};
		type DatabaseSessionAttributes = {
			userRole: string;
			lastLogin: string;
		};
		// type UserAttributes = {};
	}
}

// This keeps the current behavior of making the declarations global
export {};