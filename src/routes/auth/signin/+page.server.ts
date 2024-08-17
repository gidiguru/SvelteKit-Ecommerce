import { fail, redirect } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms";
import { lucia, github, google } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from "zod";


const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    terms: z.boolean()
});

export const load: PageServerLoad = async ({ locals }) => {
    // Check if locals.auth exists before trying to validate
    if (locals.auth) {
        const session = await locals.auth.validate();
        if (session) throw redirect(302, "/profile");
    }

    const signupForm = await superValidate(zod(signUpSchema));
    const signinForm = await superValidate(zod(signInSchema));

    return { signupForm, signinForm };
};

export const actions: Actions = {
    signin: async (event) => {
        const signinForm = await superValidate(event, zod(signInSchema));

        if (!signinForm.valid) {
            return fail(400, { signinForm });
        }

        try {
            const [dbUser] = await db
                .select()
                .from(user)
                .where(eq(user.email, signinForm.data.email));

            if (!dbUser || !dbUser.password) {
                return setError(signinForm, "", "The email or password is incorrect.");
            }

            const passwordValid = await bcrypt.compare(signinForm.data.password, dbUser.password);

            if (!passwordValid) {
                return setError(signinForm, "", "The email or password is incorrect.");
            }

            const session = await lucia.createSession(dbUser.id, {
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
                email: dbUser.email,
                isAdmin: dbUser.isAdmin,
                stripeCustomerId: dbUser.stripeCustomerId
            });
            event.locals.auth.setSession(session);
        } catch (e) {
            console.error(e);
            return setError(signinForm, "", "An error occurred during sign in.");
        }

        throw redirect(302, "/profile");
    },

    signup: async (event) => {
        const signupForm = await superValidate(event, zod(signUpSchema));

        if (!signupForm.valid) {
            return fail(400, { signupForm });
        }

        try {

            // Check if the email already exists
            const existingUser = await db
                .select({ id: user.id })
                .from(user)
                .where(eq(user.email, signupForm.data.email))
                .limit(1);

            if (existingUser.length > 0) {
                return setError(signupForm, "email", "A user with that email already exists.");
            }

            const hashedPassword = await bcrypt.hash(signupForm.data.password, 10);
            const userId = crypto.randomUUID();

            const [newUser] = await db.insert(user).values({
                id: userId,
                provider: 'emailpassword',
                providerId: signupForm.data.email,
                firstName: signupForm.data.firstName,
                lastName: signupForm.data.lastName,
                email: signupForm.data.email,
                password: hashedPassword,
                isAdmin: false,
                stripeCustomerId: null
            }).returning();

            const session = await lucia.createSession(userId, {
                firstName: signupForm.data.firstName,
                lastName: signupForm.data.lastName,
                email: signupForm.data.email,
                isAdmin: false,
                stripeCustomerId: null
            });
            event.locals.auth.setSession(session);
        } catch (e) {
            console.error(e);
            if (e instanceof Error && e.message.includes('unique constraint')) {
                return setError(signupForm, "email", "A user with that email already exists.");
            }
            return setError(signupForm, "", "An error occurred during sign up.");
        }

        throw redirect(302, "/profile");
    },

    signout: async (event) => {
        const session = await event.locals.auth.validate();
        if (!session) {
            throw redirect(302, "/auth/signin");
        }
        await lucia.invalidateSession(session.sessionId);
        event.locals.auth.setSession(null);
        throw redirect(302, "/auth/signin");
    },
};

