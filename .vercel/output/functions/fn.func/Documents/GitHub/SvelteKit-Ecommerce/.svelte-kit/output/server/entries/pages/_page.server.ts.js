import { d as db, p as productTag, b as product, g as productImage, c as productToProductTag, f as productType } from "../../chunks/index.js";
import { eq } from "drizzle-orm";
const load = async () => {
  const collections = await db.select({
    tagName: productTag.name,
    tagDesc: productTag.desc,
    productId: product.id,
    productName: product.name,
    imageCloudinaryId: productImage.cloudinaryId,
    imageOrder: productImage.order
  }).from(productTag).leftJoin(productToProductTag, eq(productTag.name, productToProductTag.tagId)).leftJoin(product, eq(productToProductTag.productId, product.id)).leftJoin(productImage, eq(product.id, productImage.productId)).orderBy(productTag.name, productImage.order);
  const productTypes = await db.select().from(productType);
  const productTypeMap = new Map(
    productTypes.map((pt) => [pt.productId, pt])
  );
  const sendData = [];
  let currentCollection = null;
  collections.forEach((row) => {
    if (!currentCollection || currentCollection.name !== row.tagName) {
      if (currentCollection) {
        sendData.push(currentCollection);
      }
      currentCollection = {
        dark: true,
        collectionTag: row.tagName ?? "",
        name: row.tagName ?? "",
        tagLine: row.tagDesc ?? "",
        productInfo: []
      };
    }
    if (row.productId && row.productName && !currentCollection.productInfo.some((p) => p.link === `/products/${row.productId}`)) {
      const pt = productTypeMap.get(row.productId);
      currentCollection.productInfo.push({
        cloudinaryId: row.imageCloudinaryId,
        secondaryCloudinary: null,
        name: row.productName,
        availableSizes: pt && pt.isAvailable && pt.width && pt.height ? [`${pt.width}x${pt.height}`] : [],
        soldOutSizes: pt && !pt.isAvailable && pt.width && pt.height ? [`${pt.width}x${pt.height}`] : [],
        link: `/products/${row.productId}`
      });
    } else if (row.productId && row.imageOrder === 2) {
      const product2 = currentCollection.productInfo.find((p) => p.link === `/products/${row.productId}`);
      if (product2) {
        product2.secondaryCloudinary = row.imageCloudinaryId;
      }
    }
  });
  if (currentCollection) {
    sendData.push(currentCollection);
  }
  return { collections: sendData };
};
export {
  load
};
