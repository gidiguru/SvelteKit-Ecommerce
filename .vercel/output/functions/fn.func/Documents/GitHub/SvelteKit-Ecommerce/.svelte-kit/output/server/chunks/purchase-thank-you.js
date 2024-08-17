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
                
                <p class="text">Thank you for ordering, ${name}!</p>

                <p class="text">
                    You are one of the very first (among the first 10) to order from us, and we could not
                    be more grateful. We have included for free an exclusive piece from a currently
                    unreleased collection that will be sent with your order.
                </p>
                
                <p class="text">
                    We're thrilled to be getting one of our pieces in your hands. We'll keep you updated
                    as we get your order fulfilled.
                </p>
                
                <p class="text">
                    Remember that our pieces are made to order, so expect at least a week before your's
                    arrives.
                </p>
                
                <p class="text">
                    We use Fracture for our fulfillment, so your package will arrive in Fracture
                    packaging, as they have the best systems in place for keeping your glass pristine!
                </p>

                <p class="text">
                    For inquiries, reach us at 
                    <a href="mailto:joguno@petraton.com">joguno@petraton.com</a>
                </p>

                <p class="signature">Best,</p>
                <p class="signature" style="margin-left: 4px;">Jogun Ogedengbe</p>
                <p class="signature italic" style="margin-left: 4px;">Synergetics Shop Team</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
async function sendPurchaseThankYou(to, name) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const html = createEmailHtml(name);
    const { data, error } = await resend.emails.send({
      from: "Jogun <joguno@petraton.com>",
      to,
      subject: "Thank you for your Order",
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
export {
  sendPurchaseThankYou as s
};
