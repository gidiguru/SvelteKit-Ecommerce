import { e as ensureAdmin } from "../../../../../../chunks/auth.js";
import { d as db, g as productImage } from "../../../../../../chunks/index.js";
import { e as error } from "../../../../../../chunks/index2.js";
import { eq, desc } from "drizzle-orm";
import { zfd } from "zod-form-data";
const load = async ({ locals, params }) => {
  ensureAdmin(locals);
  const images = await db.select().from(productImage).where(eq(productImage.productId, params.productId)).orderBy(desc(productImage.isPrimary));
  return { images };
};
const actions = {
  toggleVertical: async ({ locals, request }) => {
    ensureAdmin(locals);
    const data = await request.formData();
    const schema = zfd.formData({
      cloudinaryId: zfd.text()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      error(400, res.error.name);
    }
    const cur = await db.select({
      isVertical: productImage.isVertical
    }).from(productImage).where(eq(productImage.cloudinaryId, res.data.cloudinaryId));
    if (cur.length > 0) {
      await db.update(productImage).set({
        isVertical: !cur[0].isVertical
      }).where(eq(productImage.cloudinaryId, res.data.cloudinaryId));
    }
    return { success: true };
  },
  markPrimary: async ({ locals, request, params }) => {
    ensureAdmin(locals);
    const data = await request.formData();
    const schema = zfd.formData({
      cloudinaryId: zfd.text()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      error(400, res.error.name);
    }
    await db.update(productImage).set({
      isPrimary: false
    }).where(eq(productImage.productId, params.productId));
    await db.update(productImage).set({
      isPrimary: true
    }).where(eq(productImage.cloudinaryId, res.data.cloudinaryId));
    return { success: true };
  },
  delete: async ({ locals, request }) => {
    ensureAdmin(locals);
    const data = await request.formData();
    const schema = zfd.formData({
      cloudinaryId: zfd.text()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      error(400, res.error.name);
    }
    await db.delete(productImage).where(eq(productImage.cloudinaryId, res.data.cloudinaryId));
    return { success: true };
  },
  create: async ({ locals, request, params }) => {
    ensureAdmin(locals);
    const data = await request.formData();
    const schema = zfd.formData({
      cloudinaryId: zfd.text(),
      width: zfd.numeric(),
      height: zfd.numeric()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      error(400, res.error.name);
    }
    await db.insert(productImage).values({
      width: res.data.width,
      height: res.data.height,
      cloudinaryId: res.data.cloudinaryId,
      productId: params.productId
    });
    return { success: true };
  }
};
export {
  actions,
  load
};
