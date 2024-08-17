import { e as ensureAdmin } from "../../../../../chunks/auth.js";
import { d as db, b as product } from "../../../../../chunks/index.js";
import { e as error } from "../../../../../chunks/index2.js";
import { eq } from "drizzle-orm";
const load = async ({ locals, params }) => {
  ensureAdmin(locals);
  const firstProduct = await db.query.product.findFirst({
    where: eq(product.id, params.productId),
    columns: {
      name: true,
      desc: true
    }
  });
  if (!firstProduct) {
    error(404);
  }
  return { productId: params.productId, productBasics: firstProduct };
};
export {
  load
};
