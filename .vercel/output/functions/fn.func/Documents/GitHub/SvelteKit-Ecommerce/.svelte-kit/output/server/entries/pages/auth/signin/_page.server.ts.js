import { r as redirect, f as fail } from "../../../../chunks/index2.js";
import "../../../../chunks/client.js";
import "../../../../chunks/formData.js";
import "../../../../chunks/superForm.js";
import { s as superValidate, a as setError } from "../../../../chunks/superValidate.js";
import { l as lucia } from "../../../../chunks/auth.js";
import { d as db, u as user } from "../../../../chunks/index.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { z as zod } from "../../../../chunks/zod.js";
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
const load = async ({ locals }) => {
  if (locals.auth) {
    const session = await locals.auth.validate();
    if (session)
      throw redirect(302, "/profile");
  }
  const signupForm = await superValidate(zod(signUpSchema));
  const signinForm = await superValidate(zod(signInSchema));
  return { signupForm, signinForm };
};
const actions = {
  signin: async (event) => {
    const signinForm = await superValidate(event, zod(signInSchema));
    if (!signinForm.valid) {
      return fail(400, { signinForm });
    }
    try {
      const [dbUser] = await db.select().from(user).where(eq(user.email, signinForm.data.email));
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
      const existingUser = await db.select({ id: user.id }).from(user).where(eq(user.email, signupForm.data.email)).limit(1);
      if (existingUser.length > 0) {
        return setError(signupForm, "email", "A user with that email already exists.");
      }
      const hashedPassword = await bcrypt.hash(signupForm.data.password, 10);
      const userId = crypto.randomUUID();
      const [newUser] = await db.insert(user).values({
        id: userId,
        provider: "emailpassword",
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
      if (e instanceof Error && e.message.includes("unique constraint")) {
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
  }
};
export {
  actions,
  load
};
