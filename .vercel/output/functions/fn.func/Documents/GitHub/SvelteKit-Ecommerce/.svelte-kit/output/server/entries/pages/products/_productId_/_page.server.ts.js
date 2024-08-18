import { d as db, b as product, g as productImage, f as productType } from "../../../../chunks/index.js";
import { e as error } from "../../../../chunks/index2.js";
import { eq, desc, and } from "drizzle-orm";
const load = async ({ params }) => {
  console.log(`Loading product with ID: ${params.productId}`);
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
      }
    }
  });
  console.log(`Product query result:`, firstProduct);
  if (!firstProduct) {
    console.error(`Product with ID ${params.productId} not found`);
    error(404, {
      message: "Not found"
    });
  }
  const primaryImage = await db.query.productImage.findFirst({
    where: and(eq(productImage.isPrimary, true), eq(productImage.productId, params.productId))
  });
  console.log(`Primary image query result:`, primaryImage);
  const productTypeData = await db.query.productType.findFirst({
    where: eq(productType.productId, params.productId)
  });
  console.log(`Product type query result:`, productTypeData);
  if (!productTypeData) {
    console.error(`Product type for product ID ${params.productId} not found`);
    error(404, {
      message: "Product type not found"
    });
  }
  console.log(`Successfully loaded product, primary image, and product type`);
  return {
    product: firstProduct,
    primaryImage,
    productType: productTypeData
  };
};
export {
  load
};
