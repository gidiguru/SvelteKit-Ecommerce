import { r as redirect } from "../../../../../chunks/index2.js";
import { d as db, u as user } from "../../../../../chunks/index.js";
import { eq } from "drizzle-orm";
import { s as sendWelcomeEmail } from "../../../../../chunks/welcome-email.js";
const load = async (event) => {
  console.log("event.params:", event.params);
  console.log("event.url:", event.url.toString());
  const authUser = await event.locals.auth.validateUser();
  if (!authUser)
    throw redirect(302, "/auth/signin");
  if (authUser.verified)
    throw redirect(302, "/profile");
  const token = event.params.token ?? event.url.searchParams.get("token") ?? null;
  if (!token) {
    return {
      result: {
        heading: "No Verification Token",
        message: "Please provide a valid verification token."
      }
    };
  }
  try {
    const foundUser = await db.query.user.findFirst({
      where: eq(user.token, token)
    });
    let heading = "Email Verification Problem";
    let message = "Your email could not be verified. Please contact support if you feel this is an error.";
    if (foundUser) {
      await sendWelcomeEmail(foundUser.email, `${foundUser.firstName} ${foundUser.lastName}`);
      heading = "Email Verified";
      message = 'Your email has been verified. You can now <a href="/auth/signin">sign in</a>';
      await db.update(user).set({ token: null, verified: true }).where(eq(user.token, token));
    }
    return { result: { heading, message } };
  } catch (e) {
    console.error("Error in email verification:", e);
    return {
      result: {
        heading: "Verification Error",
        message: "An error occurred during email verification. Please try again later or contact support."
      }
    };
  }
};
const actions = {
  // ... (any actions you want to define)
};
export {
  actions,
  load
};
