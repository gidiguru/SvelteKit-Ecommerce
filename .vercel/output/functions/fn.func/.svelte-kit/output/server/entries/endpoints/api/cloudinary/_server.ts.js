import { v2 } from "cloudinary";
import { p as private_env } from "../../../../chunks/shared-server.js";
import { j as json, e as error } from "../../../../chunks/index.js";
const POST = async ({ request }) => {
  const body = await request.json();
  const { paramsToSign } = body;
  try {
    const signature = v2.utils.api_sign_request(paramsToSign, private_env.CLOUDINARY_API_SECRET);
    return json({ signature });
  } catch (e) {
    console.error(e);
    throw error(500, e.message);
  }
};
export {
  POST
};
