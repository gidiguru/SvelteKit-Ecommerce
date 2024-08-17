import { f as fail, r as redirect } from "../../../../../chunks/index2.js";
import { s as superValidate, a as setError } from "../../../../../chunks/superValidate.js";
import { u as userUpdatePasswordSchema } from "../../../../../chunks/zod-schemas.js";
import { d as db, u as user } from "../../../../../chunks/index.js";
import { eq } from "drizzle-orm";
import "../../../../../chunks/formData.js";
import { z as zod } from "../../../../../chunks/zod.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
const load = async ({ params, url }) => {
  if (!url.pathname.endsWith("/update-success")) {
    const form = await superValidate(zod(userUpdatePasswordSchema));
    console.log("Server: Form initialized", form);
    return {
      form,
      token: params.token
    };
  }
  return {};
};
function isTokenValid(token) {
  try {
    const [tokenPart, expiresAtStr] = token.split(".");
    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt)) {
      console.error("Invalid expiration time in token");
      return false;
    }
    const isValid = Date.now() < expiresAt && tokenPart.length === 43;
    console.log("Token validation result:", isValid, "Current time:", Date.now(), "Expiry time:", expiresAt);
    return isValid;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
}
function generateToken() {
  const tokenBytes = crypto.randomBytes(32);
  const expiresAt = Date.now() + 36e5;
  return `${tokenBytes.toString("base64url")}.${expiresAt}`;
}
const actions = {
  default: async ({ request, params }) => {
    console.log("Starting password reset action");
    const form = await superValidate(request, zod(userUpdatePasswordSchema));
    console.log("Server: Form data received", form);
    if (!form.valid) {
      console.log("Server: Form validation failed", form.errors);
      return fail(400, { form });
    }
    const token = params.token;
    console.log("Server: Received token:", token);
    if (!token || !isTokenValid(token)) {
      console.log("Server: Token is invalid or expired");
      return setError(form, "", "This password reset link has expired. Please request a new one.");
    }
    console.log("Server: Searching for user with token:", token);
    const foundUsers = await db.select().from(user).where(eq(user.token, token)).limit(1);
    if (foundUsers.length === 0) {
      console.log("Server: No user found with this token");
      return setError(form, "", "Invalid or expired password reset link. Please request a new one.");
    }
    const foundUser = foundUsers[0];
    console.log("Server: User found:", foundUser.email);
    const newToken = generateToken();
    try {
      await db.transaction(async (trx) => {
        console.log("Server: Starting password hashing");
        const hashedPassword = await bcrypt.hash(form.data.password, 10);
        console.log("Server: Password hashed successfully");
        console.log("Server: Updating user password and token");
        const updateResult = await trx.update(user).set({
          password: hashedPassword,
          token: newToken
        }).where(eq(user.id, foundUser.id));
        console.log("Server: Update result:", updateResult);
      });
      console.log("Server: Password updated successfully");
      console.log("Server: Redirecting to success page");
    } catch (e) {
      console.error("Server: Error in password update action:", e);
      return setError(form, "", "There was a problem resetting your password. Please try again later or contact support if you need further help.");
    }
    return redirect(303, "/auth/password/update-${token}/success");
  }
};
export {
  actions,
  load
};
