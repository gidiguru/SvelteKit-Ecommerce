import { v2 } from "cloudinary";
import { j as json, e as error } from "../../../../chunks/index2.js";
import dotenv__default from "dotenv";
dotenv__default.config();
const POST = async ({ request }) => {
  const body = await request.json();
  const { paramsToSign } = body;
  try {
    const signature = v2.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
    return json({ signature });
  } catch (e) {
    console.error(e);
    throw error(500, e.message);
  }
};
export {
  POST
};
