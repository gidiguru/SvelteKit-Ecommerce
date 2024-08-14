import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import type { PageServerLoad, Actions } from './$types';
import { sendWelcomeEmail } from "$lib/emails/welcome-email.js";

export const load: PageServerLoad = async (event) => {
    const authUser = await event.locals.auth.validateUser();
    if (!authUser) throw redirect(302, "/auth/signin");
    if (authUser.verified) throw redirect(302, "/profile");

    try {
        const token = event.params.token as string;

        const result = await db.query.user.findFirst({
            where: eq(user.token, token)
        }).then(async (foundUser) => {
            let heading = "Email Verification Problem";
            let message =
                "Your email could not be verified. Please contact support if you feel this is an error.";
            if (foundUser) {
                sendWelcomeEmail(foundUser.email, `${foundUser.firstName} ${foundUser.lastName}`);
                heading = "Email Verified";
                message =
                    'Your email has been verified. You can now <a href="/auth/signin">sign in</a>';
                await db.update(user)
                    .set({ token: null }) // Assuming you want to clear the token after verification
                    .where(eq(user.token, token));
            }
            return { heading, message };
        });

        return {
            result
        };
    } catch (e) {
        return fail(500, {
            error: e
        });
    }
};