import { d as db, e as emailList } from "../../../../chunks/index.js";
import { e as error, r as redirect } from "../../../../chunks/index2.js";
import { generateId } from "lucia";
import { zfd } from "zod-form-data";
import { Resend } from "resend";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
path.dirname(__filename);
function createEmailHtml(name) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sediment Art: Thank you for your Order!</title>
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
                <h1 style="text-align: center; color: #333;">Sediment Art: Thank you for your order!</h1>
                <hr class="hr">
                
                <img 
                    src="https://res.cloudinary.com/insiderviz/image/upload/f_auto,q_auto/ly9xqkjkn8rat1l3lxex" 
                    alt="Sediment Art" 
                    class="logo"
                >
                
                <p class="text">Welcome to The Tech Shop, ${name}!</p>

                <p class="text">
                Dive into a world of captivating natural art, of rocks expertly photographed that are
                millions of years old, encased in glass.
            </p>
            <p class="text">
                We'll keep you updated for when new drops come and new images are made available!
            </p>
            <p class="text">
                For inquiries, reach us at 
                <a href="joguno@petraton.com">joguno@petraton.com</a>>

                <p class="signature">Best,</p>
                <p class="signature" style="margin-left: 4px;">Jogun Ogedengbe</p>
                <p class="signature italic" style="margin-left: 4px;">Tech Shop Team</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
async function sendWelcomeEmail(to, name) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const html = createEmailHtml(name);
    const { data, error: error2 } = await resend.emails.send({
      from: "Jogun <joguno@petraton.com>",
      to,
      subject: "Welcome to the Tech Shop",
      html
    });
    if (error2) {
      console.error("Error sending email:", error2);
    } else {
      console.log("Email sent successfully:", data);
    }
  } catch (error2) {
    console.error("Error in sendEmail:", error2 instanceof Error ? error2.message : String(error2));
  }
}
const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const schema = zfd.formData({
      email: zfd.text()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      error(400, res.error.name);
    }
    const key = generateId(20);
    await db.insert(emailList).values({
      email: res.data.email,
      key,
      subscribedAt: /* @__PURE__ */ new Date()
    });
    await sendWelcomeEmail(res.data.email, key);
    redirect(303, "/");
  }
};
export {
  actions
};
