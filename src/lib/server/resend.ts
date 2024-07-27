import { Resend } from 'resend';
//import { render } from 'svelte-email';
import {renderThankYouListEmail} from '$lib/emails/renderEmailTemplate.js';
import {renderPurchaseThankYouEmail} from '$lib/emails/renderEmailTemplate.js';
//import SedimentPurchaseThankYou from '$lib/emails/sediment-purchase-thank-you.svelte';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendThankYouListEmail = async (email: string, unsubKey: string): Promise<void> => {
    try {
        const html = await renderThankYouListEmail({unsubKey,
                email});
        

        const { data, error } = await resend.emails.send({
            from: 'joguno@petraton.com',
            to: email,
            subject: 'Welcome to Tech Shop',
            html: html
        });

        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', data);
        }
    } catch (e) {
        console.error('Error in sendThankYouListEmail:', e);
    }
};

export const sendThankYouPurchaseEmail = async (email: string): Promise<void> => {
    try {
        const html = await renderPurchaseThankYouEmail({email});

        const { data, error } = await resend.emails.send({
            from: 'joguno@petraton.com',
            to: email,
            subject: 'Tech Shop: Thank you for your order!',
            html: html
        });

        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', data);
        }
    } catch (error) {
        console.error('Error in sendThankYouPurchaseEmail:', error);
    }
};