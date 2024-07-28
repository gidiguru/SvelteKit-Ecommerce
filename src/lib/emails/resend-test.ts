import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);
import { sendPurchaseThankYou } from '$lib/emails/purchase-thank-you';


dotenv.config();

async function testEmail() {
    try {
        await sendPurchaseThankYou('tomijoguno@gmail.com', 'Jogun Ogedengbe');
        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
}

testEmail();
