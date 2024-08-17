import { f as fail } from "../../../../../chunks/index2.js";
import { s as superValidate, m as message, a as setError } from "../../../../../chunks/superValidate.js";
import { a as userSchema } from "../../../../../chunks/zod-schemas.js";
import { Resend } from "resend";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import "../../../../../chunks/auth.js";
import { d as db, u as user } from "../../../../../chunks/index.js";
import { eq } from "drizzle-orm";
import "bcrypt";
import "../../../../../chunks/formData.js";
import { z as zod } from "../../../../../chunks/zod.js";
import crypto from "crypto";
const BASE_URL = "https://sveltekit-auth.uv-ray.com";
const APP_NAME = "Sveltekit Auth Starter";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
path.dirname(__filename);
function createEmailHtml(email, token) {
  const updatePasswordURL = `${BASE_URL}/auth/password/update-${token}`;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Update Your Password for ${APP_NAME}</title>
        <style>
            body {
                font-family: sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f6f6f6;
            }
            .container {
                background-color: white;
                margin: auto;
                padding: 8px;
            }
            .inner-container {
                border: 1px solid #eaeaea;
                border-radius: 4px;
                margin: 40px auto;
                padding: 20px;
                max-width: 465px;
            }
            .logo {
                display: block;
                margin: 32px auto 0;
                width: 300px;
                height: 102px;
            }
            .text {
                color: black;
                font-size: 14px;
                line-height: 24px;
            }
            .signature {
                color: black;
                font-size: 12px;
                line-height: 4px;
                padding-top: 16px;
            }
            .signature.italic {
                font-style: italic;
            }
            .hr {
                border: none;
                border-top: 1px solid #eaeaea;
                margin: 26px 0;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="inner-container">
                <hr class="hr">
                <h1 style="text-align: center; color: #333;">Synergetics Shop Password Reset</h1>
                <hr class="hr">
                
                <img 
                    src="https://res.cloudinary.com/insiderviz/image/upload/f_auto,q_auto/ly9xqkjkn8rat1l3lxex" 
                    alt="Sediment Art" 
                    class="logo"
                >
                <p>Please click this <a href="${updatePasswordURL}">link</a> to change your password for ${APP_NAME}.</p>  
	            <p>You can also visit the link below.</p><p>${updatePasswordURL}</p><p>If you did not request to change your password, you can disregard this email.</p>
                
            </div>
        </div>
    </body>
    </html>
  `;
}
async function sendPasswordResetEmail(email, token) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const html = createEmailHtml(email, token);
    const { data, error } = await resend.emails.send({
      from: "Jogun <joguno@petraton.com>",
      to: email,
      subject: "Update Your Password",
      html
    });
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", data);
    }
  } catch (error) {
    console.error("Error in sendEmail:", error instanceof Error ? error.message : String(error));
  }
}
const resetPasswordSchema = userSchema.pick({ email: true });
console.log("Server: Initializing password reset module");
const load = async ({ request }) => {
  console.log("Server: Loading password reset page");
  const form = await superValidate(zod(resetPasswordSchema));
  console.log("Server: Form initialized", form);
  return { form };
};
function generateToken() {
  const tokenBytes = crypto.randomBytes(32);
  const expiresAt = Date.now() + 36e5;
  const token = `${tokenBytes.toString("base64url")}.${expiresAt}`;
  console.log("Server: Generated token:", token);
  return token;
}
const actions = {
  default: async ({ request }) => {
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
      const existingUser = await db.select().from(user).where(eq(user.email, form.data.email)).limit(1);
      if (existingUser.length === 0) {
        console.log("Server: User not found for email", form.data.email);
        return message(
          form,
          "If an account with that email exists, we have sent a password reset link. Please check your email."
        );
      }
      const token = generateToken();
      console.log("Server: Generated reset token", token);
      const updateResult = await db.update(user).set({ token }).where(eq(user.email, form.data.email));
      console.log("Server: Database update result", updateResult);
      try {
        await sendPasswordResetEmail(form.data.email, token);
        console.log("Server: Password reset email sent successfully");
      } catch (emailError) {
        console.error("Server: Error sending password reset email", emailError);
        return message(
          form,
          "We encountered an issue sending the email. Our team has been notified. Please try again later."
        );
      }
    } catch (e) {
      console.error("Server: Error during password reset process", e);
      return setError(
        form,
        "",
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
export {
  actions,
  load
};
