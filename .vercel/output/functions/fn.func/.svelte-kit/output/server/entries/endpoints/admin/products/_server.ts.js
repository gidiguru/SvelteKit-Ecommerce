import { e as ensureAdmin } from "../../../../chunks/auth.js";
import { d as deleteOneProduct } from "../../../../chunks/products.js";
import { j as json } from "../../../../chunks/index.js";
const DELETE = async ({ locals, url }) => {
  ensureAdmin(locals);
  const productId = url.searchParams.get("productId");
  if (!productId) {
    return json(
      { message: "missing product id..." },
      {
        status: 400
      }
    );
  }
  await deleteOneProduct(productId);
  return new Response("success");
};
export {
  DELETE
};
