// src/lib/emails/welcome-email.ts
import WelcomeEmail from './WelcomeEmail.svelte';
import { render } from 'svelte-email';
import { Resend } from 'resend';

export function generateWelcomeEmail(name: string): string {
    try {
        const emailHtml = render({
            template: WelcomeEmail,
            props: {
                name: name
            }
        });
        return emailHtml;
    } catch (error) {
        console.error('Error generating welcome email:', error);
        throw new Error('Failed to generate welcome email');
    }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
        const emailContent = generateWelcomeEmail(name);

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Welcome to Our Service!',
            html: emailContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw new Error('Failed to send welcome email');
    }
}

// Function to test email sending (for debugging purposes)
export async function testWelcomeEmail(): Promise<void> {
    try {
        await sendWelcomeEmail('test@example.com', 'Test User');
        console.log('Test welcome email sent successfully');
    } catch (error) {
        console.error('Error sending test welcome email:', error);
    }
}

// Example usage in a route handler or server-side function
export async function handleNewUserRegistration(userData: { email: string; name: string }): Promise<void> {
    try {
        await sendWelcomeEmail(userData.email, userData.name);
        console.log(`Welcome email sent to ${userData.email}`);
    } catch (error) {
        console.error(`Failed to send welcome email to ${userData.email}:`, error);
        // Handle the error (e.g., log it, notify admin, etc.)
    }
}