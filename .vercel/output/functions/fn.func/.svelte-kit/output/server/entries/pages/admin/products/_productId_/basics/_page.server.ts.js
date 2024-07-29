import { e as ensureAdmin } from "../../../../../../chunks/auth.js";
import { d as db, a as product } from "../../../../../../chunks/index.js";
import { e as error } from "../../../../../../chunks/index2.js";
import { eq } from "drizzle-orm";
import { zfd } from "zod-form-data";
const actions = {
  default: async ({ locals, request, params }) => {
    ensureAdmin(locals);
    const data = await request.formData();
    const schema = zfd.formData({
      name: zfd.text(),
      desc: zfd.text()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      error(400, res.error.name);
    }
    await db.update(product).set({
      name: res.data.name,
      desc: res.data.desc
    }).where(eq(product.id, params.productId));
    return { success: true };
  }
};
export {
  actions
};
