import { d as db, a as product, c as productImage, f as productType } from "../../../../chunks/index.js";
import { e as error } from "../../../../chunks/index2.js";
import { eq, desc, and, asc } from "drizzle-orm";
const load = async ({ params }) => {
  const firstProduct = await db.query.product.findFirst({
    where: eq(product.id, params.productId),
    with: {
      images: {
        orderBy: desc(productImage.isPrimary),
        where: and(eq(productImage.isVertical, false), eq(productImage.isPrimary, false))
      },
      tags: {
        with: {
          tag: true
        }
      },
      sizes: {
        orderBy: asc(productType.price)
      }
    }
  });
  const primaryImage = await db.query.productImage.findFirst({
    where: and(eq(productImage.isPrimary, true), eq(productImage.productId, params.productId))
  });
  if (!firstProduct) {
    error(404, {
      message: "Not found"
    });
  }
  return { product: firstProduct, primaryImage };
};
export {
  load
};
