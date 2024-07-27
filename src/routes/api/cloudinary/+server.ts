import { v2 as cloudinary } from 'cloudinary';
//import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

export const POST = async ({ request }) => {
	const body = await request.json();
	const { paramsToSign } = body;
	try {
		const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);
		return json({ signature });
	} catch (e) {
		console.error(e);
		throw error(500, (e as Error).message);
	}
};
