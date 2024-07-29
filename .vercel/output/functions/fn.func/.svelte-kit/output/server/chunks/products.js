import { d as db, c as productImage, f as productSize, g as productReview, b as productToProductTag, a as product } from "./index.js";
import { eq, desc } from "drizzle-orm";
const deleteOneProduct = async (id) => {
  await db.delete(productImage).where(eq(productImage.productId, id));
  await db.delete(productSize).where(eq(productSize.productId, id));
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
