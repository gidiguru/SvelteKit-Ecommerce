import { db } from '$lib/server/db/index.js';
import { emailList } from '$lib/server/db/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { zfd } from 'zod-form-data';
import { sendWelcomeEmail } from '$lib/emails/welcome-email';

export const actions = {
	default: async ({ request }: { request: any }) => {
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
			subscribedAt: new Date()
		});

		await sendWelcomeEmail(res.data.email, key);

		redirect(303, '/');
	}
};
