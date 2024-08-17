import { d as db, g as productImage, f as productType, h as productReview, c as productToProductTag, b as product } from "./index.js";
import { eq, desc } from "drizzle-orm";
const deleteOneProduct = async (id) => {
  await db.delete(productImage).where(eq(productImage.productId, id));
  await db.delete(productType).where(eq(productType.productId, id));
  await db.delete(productReview).where(eq(productReview.productId, id));
  await db.delete(productToProductTag).where(eq(productToProductTag.productId, id));
  await db.delete(product).where(eq(product.id, id));
};
const fetchAllProducts = async (take, skip) => {
  const products = await db.query.product.findMany({
    limit: take,
    offset: skip,
    with: {
      sizes: true,
      images: {
        orderBy: desc(productImage.isPrimary)
      },
      tags: {
        with: {
          tag: true
        }
      }
    }
  });
  return products;
};
export {
  deleteOneProduct as d,
  fetchAllProducts as f
};
