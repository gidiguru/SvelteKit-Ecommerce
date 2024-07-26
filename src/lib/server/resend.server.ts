import { render } from 'svelte-email';
import { Resend } from 'resend';
import SedimentListThankYou from '$lib/emails/sediment-list-thank-you.svelte';
import SedimentPurchaseThankYou from '$lib/emails/sediment-purchase-thank-you.svelte';


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendThankYouListEmail = async (email: string, unsubKey: string): Promise<void> => {
	try {
        const emailHtml = await render({
            template: SedimentListThankYou,
            props: {
                unsubKey,
                email
            },
        });

	
		const { data, error } =	await resend.emails.send({
			from: 'joguno@petraton.com',
			to: email,
			subject: 'Welcome to Tech Shop',
            html: emailHtml
		});
		console.log('sent');
	} catch (e) {
		console.log('error sending:', e);
	}
}



export const sendThankYouPurchaseEmail = async (email: string): Promise<void> => {
    try {
        const emailHtml = await render({
            template: SedimentPurchaseThankYou
        });
		
        const { data, error } = await resend.emails.send({
            from: 'joguno@petraton.com',
            to: email,
            subject: 'Tech Shop: Thank you for your order!',
            html: emailHtml
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
