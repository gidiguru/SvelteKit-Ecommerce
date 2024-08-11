import { db } from '$lib/server/db/index.js';
import { emailList } from '$lib/server/db/schema.js';
import { fail } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { sendWelcomeEmail } from '$lib/emails/welcome-email.ts';
import type { Actions } from './$types';
import { eq } from 'drizzle-orm';

// Simple in-memory rate limiter
const RATE_LIMIT = 5; // max 5 attempts
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const isRateLimited = (ip: string): boolean => {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
        return false;
    }
    if (record.count >= RATE_LIMIT) {
        return true;
    }
    record.count++;
    return false;
};

export const actions: Actions = {
    default: async ({ request, getClientAddress }) => {
        const clientIp = getClientAddress();
        if (isRateLimited(clientIp)) {
            console.log(`Rate limit exceeded for IP: ${clientIp}`);
            return fail(429, {
                error: 'Too many attempts. Please try again later.'
            });
        }

        try {
            const data = await request.formData();

            const schema = zfd.formData({
                email: z.string().email('Invalid email address')
            });

            const result = schema.safeParse(data);

            if (!result.success) {
                console.log('Form validation failed:', result.error.flatten().fieldErrors);
                return fail(400, {
                    error: 'Invalid email address',
                    errors: result.error.flatten().fieldErrors
                });
            }

            const { email } = result.data;

            // Check if email already exists
            const existingEmail = await db.select().from(emailList).where(eq(emailList.email, email)).limit(1);
            if (existingEmail.length > 0) {
                console.log('Duplicate email signup attempt:', email);
                return fail(400, {
                    error: 'You are already on the email list',
                    email: email
                });
            }

            const key = generateId(20);

            await db.insert(emailList).values({
                email,
                key,
                subscribedAt: new Date()
            });

            await sendWelcomeEmail(email, key);

            console.log('Email signup successful:', email);
            return { success: true };

        } catch (err) {
            console.error('Unexpected error in email signup:', err);
            return fail(500, {
                error: 'An unexpected error occurred. Please try again later.'
            });
        }
    }
};
