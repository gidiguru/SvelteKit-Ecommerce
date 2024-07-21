import { d as db, e as emailList } from "../../../../chunks/index2.js";
import { e as error, r as redirect } from "../../../../chunks/index.js";
import { generateId } from "lucia";
import { zfd } from "zod-form-data";
import { s as sendThankYouListEmail } from "../../../../chunks/resend.js";
const actions = {
  default: async ({ request }) => {
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
      subscribedAt: /* @__PURE__ */ new Date()
    });
    await sendThankYouListEmail(res.data.email, key);
    redirect(303, "/");
  }
};
export {
  actions
};
