import { fail, redirect } from "@sveltejs/kit";
import { message, setError, superValidate } from "sveltekit-superforms/server";
import { userSchema } from "$lib/config/zod-schemas";
import { sendPasswordResetEmail } from "$lib/emails/password-reset.js";
import { lucia } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { zod } from 'sveltekit-superforms/adapters';
import { z } from "zod";
import type { PageServerLoad, Actions } from './$types';
import crypto from 'crypto';

const resetPasswordSchema = userSchema.pick({ email: true });

console.log("Server: Initializing password reset module");

export const load: PageServerLoad = async ({ request }) => {
    console.log("Server: Loading password reset page");
    const form = await superValidate(zod(resetPasswordSchema));
    console.log("Server: Form initialized", form);
    
    return { form };
};

function generateToken(): string {
    const tokenBytes = crypto.randomBytes(32);
    const expiresAt = Date.now() + 3600000; // 1 hour from now
    const token = `${tokenBytes.toString('base64url')}.${expiresAt}`;
    console.log("Server: Generated token:", token);
    return token;
}

function isTokenValid(token: string): boolean {
    console.log("Server: Validating token:", token);
    try {
        const [tokenPart, expiresAtStr] = token.split('.');
        console.log("Server: Token parts - Token:", tokenPart, "Expiry:", expiresAtStr);
        const expiresAt = parseInt(expiresAtStr, 10);
        if (isNaN(expiresAt)) {
            console.error("Server: Invalid expiration time in token");
            return false;
        }
        const isValid = Date.now() < expiresAt && tokenPart.length === 43; // Base64Url encoded 32 bytes is 43 characters
        console.log("Server: Token validation result:", isValid, "Current time:", Date.now(), "Expiry time:", expiresAt);
        return isValid;
    } catch (error) {
        console.error("Server: Error validating token:", error);
        return false;
    }
}

export const actions = {
	default: async ({request}) => {
		console.log("Server: Password reset action triggered");
		const form = await superValidate(request, zod(resetPasswordSchema));
		console.log("Server: Form data received", form);

		if (!form.valid) {
			console.log("Server: Form validation failed", form.errors);
			return fail(400, {
				form
			});
		}

		try {
			console.log("Server: Attempting to reset user password for email", form.data.email);
			
			// Check if user exists
			const existingUser = await db.select().from(user).where(eq(user.email, form.data.email)).limit(1);
			
			if (existingUser.length === 0) {
				console.log("Server: User not found for email", form.data.email);
				// Don't reveal that the user doesn't exist for security reasons
				return message(
					form,  
					"If an account with that email exists, we have sent a password reset link. Please check your email."
				);
			}

			const token = generateToken();
			console.log("Server: Generated reset token", token);

			const updateResult = await db.update(user)
				.set({ token: token })
				.where(eq(user.email, form.data.email));
			console.log("Server: Database update result", updateResult);

			try {
				await sendPasswordResetEmail(form.data.email, token);
				console.log("Server: Password reset email sent successfully");
			} catch (emailError) {
				console.error("Server: Error sending password reset email", emailError);
				// Log the error but don't reveal it to the user
				return message(
					form,
					"We encountered an issue sending the email. Our team has been notified. Please try again later."
				);
			}

		} catch (e) {
			console.error("Server: Error during password reset process", e);
			return setError(
				form, '',
				"There was a problem processing your request. Please try again later or contact support if you need further help."
			);
		}

		console.log("Server: Password reset process completed successfully");
		return message(
			form,  
			"If an account with that email exists, we have sent a password reset link. Please check your email."
		);
	}
};

console.log("Server: Password reset module fully loaded");