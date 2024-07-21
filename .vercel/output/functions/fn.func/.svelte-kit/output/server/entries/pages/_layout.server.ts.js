import { d as db, o as order, p as productTag, a as product, b as productToProductTag } from "../../chunks/index2.js";
import { eq } from "drizzle-orm";
const load = async ({ locals }) => {
  const orders = await db.select({
    id: order.stripeOrderId
  }).from(order);
  const collections = await db.select({ collection: productTag.name, name: product.name, id: product.id }).from(productTag).innerJoin(productToProductTag, eq(productTag.name, productToProductTag.tagId)).innerJoin(product, eq(product.id, productToProductTag.productId));
  const reducedCollections = [];
  collections.forEach((el) => {
    let found = false;
    reducedCollections.forEach((col) => {
      if (col.collection == el.collection) {
        col.products.push({ name: el.name, id: el.id });
        found = true;
      }
    });
    if (!found) {
      reducedCollections.push({
        collection: el.collection,
        products: [{ name: el.name, id: el.id }]
      });
    }
    found = false;
  });
  const pieces = await db.select({
    id: product.id,
    name: product.name
  }).from(product);
  return {
    user: locals.user,
    collections: reducedCollections,
    isSoldOut: orders.length >= 10,
    numberLeft: 10 - orders.length,
    pieces
  };
};
export {
  load
};
