import { d as db, o as order, p as productTag, b as product, c as productToProductTag, f as productType } from "../../chunks/index.js";
import { eq } from "drizzle-orm";
const load = async ({ locals }) => {
  console.log("Starting load function");
  console.log("Fetching orders");
  const orders = await db.select({
    id: order.orderId
  }).from(order);
  console.log(`Fetched ${orders.length} orders`);
  console.log("Fetching collections and associated products");
  const collections = await db.select({
    collection: productTag.name,
    name: product.name,
    id: product.id
  }).from(productTag).innerJoin(productToProductTag, eq(productTag.name, productToProductTag.tagId)).innerJoin(product, eq(product.id, productToProductTag.productId));
  console.log(`Fetched ${collections.length} collection-product associations`);
  console.log("Processing collections data");
  const reducedCollections = collections.reduce((acc, el) => {
    const existingCollection = acc.find((col) => col.collection === el.collection);
    if (existingCollection) {
      existingCollection.products.push({ name: el.name, id: el.id });
    } else {
      acc.push({
        collection: el.collection,
        products: [{ name: el.name, id: el.id }]
      });
    }
    return acc;
  }, []);
  console.log(`Processed ${reducedCollections.length} unique collections`);
  console.log("Fetching product pieces with types");
  const pieces = await db.select({
    id: product.id,
    name: product.name,
    type: productType.name,
    price: productType.price,
    currency: productType.currency,
    isAvailable: productType.isAvailable
  }).from(product).leftJoin(productType, eq(product.id, productType.productId));
  console.log(`Fetched ${pieces.length} product pieces`);
  console.log("Calculating availability");
  const availablePieces = pieces.filter((piece) => piece.isAvailable);
  const totalAvailable = availablePieces.length;
  const isSoldOut = totalAvailable === 0;
  console.log(`Total available pieces: ${totalAvailable}, Sold out: ${isSoldOut}`);
  console.log("Load function completed");
  return {
    user: locals.user,
    collections: reducedCollections,
    isSoldOut,
    numberLeft: totalAvailable,
    pieces: availablePieces
  };
};
export {
  load
};
