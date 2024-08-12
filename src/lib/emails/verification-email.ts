import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { BASE_URL, APP_NAME } from "$lib/config/constants.ts";

dotenv.config();

const verifyEmailURL = `${BASE_URL}/auth/verify/email-${token}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createEmailHtml(name: string): string {
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
                <h1 style="text-align: center; color: #333;">Tech Shop Password Reset</h1>
                <hr class="hr">
                
                <img 
                    src="https://res.cloudinary.com/insiderviz/image/upload/f_auto,q_auto/ly9xqkjkn8rat1l3lxex" 
                    alt="Sediment Art" 
                    class="logo"
                >
                <p>Please click this <a href="${verifyEmailURL}">link</a> to verify your email address for your ${APP_NAME} account.</p>  <p>You can also visit the link below.</p><p>${verifyEmailURL}</p><p>If you did not create this account, you can disregard this email.</p>
                
            </div>
        </div>
    </body>
    </html>
  `;
}

export async function sendVerificationEmail(to: string, name: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const html = createEmailHtml(name);

    const { data, error } = await resend.emails.send({
      from: 'Jogun <joguno@petraton.com>',
      to: to,
      subject: 'Verify Your Email for Tech Shop',
      html: html
    });

    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', data);
    }
  } catch (error) {
    console.error('Error in sendEmail:', error instanceof Error ? error.message : String(error));
  }
}