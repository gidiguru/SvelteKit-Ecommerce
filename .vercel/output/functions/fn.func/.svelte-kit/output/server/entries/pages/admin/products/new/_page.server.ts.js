import { e as ensureAdmin } from "../../../../../chunks/auth.js";
import { d as db, a as product } from "../../../../../chunks/index.js";
import { e as error, r as redirect } from "../../../../../chunks/index2.js";
import { generateId } from "lucia";
import { zfd } from "zod-form-data";
const actions = {
  default: async ({ locals, request }) => {
    ensureAdmin(locals);
    const data = await request.formData();
    const schema = zfd.formData({
      name: zfd.text(),
      desc: zfd.text()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      error(400, res.error.name);
      return;
    }
    const productId = generateId(15);
    await db.insert(product).values({
      id: productId,
      name: res.data.name,
      desc: res.data.desc
    });
    redirect(300, `/admin/products/${productId}/sizes`);
  }
};
export {
  actions
};
