import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { fail, redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { sendVerificationEmail } from "$lib/emails/verification-email";
import { eq } from "drizzle-orm";
import crypto from 'crypto';

export const load = async (event: RequestEvent) => {
    const authUser = await event.locals.auth.validateUser();
    if (!authUser) throw redirect(302, "/auth/signin");
    console.dir(authUser);
    // Note: 'verified' field doesn't exist in the schema, you may need to adjust this check
    if (authUser.verified) throw redirect(302, "/profile");

    try {
        const token = event.params.token;
        if (!token) {
            return fail(400, { error: "Token is required" });
        }

        const foundUser = await db.query.user.findFirst({
            where: eq(user.token, token)
        });

        let heading = "Email Verification Problem";
        let message = "A new email could not be sent. Please contact support if you feel this was an error.";

        if (foundUser) {
            heading = "Email Verification Sent";
            message = "A new verification email was sent. Please check your email for the message. (Check the spam folder if it is not in your inbox)";
            
            const newToken = crypto.randomUUID();
            
            await db.update(user)
                .set({ token: newToken })
                .where(eq(user.token, token));
            
            await sendVerificationEmail(foundUser.email, newToken);
        }

        return {
            result: { heading, message }
        };
    } catch (e) {
        console.error(e);
        return fail(500, {
            error: "An unexpected error occurred"
        });
    }
};