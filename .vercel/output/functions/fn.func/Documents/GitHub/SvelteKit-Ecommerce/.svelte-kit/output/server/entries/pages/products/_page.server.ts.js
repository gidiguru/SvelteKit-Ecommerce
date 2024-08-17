import { d as db, c as productToProductTag, g as productImage, p as productTag } from "../../../chunks/index.js";
import { e as error } from "../../../chunks/index2.js";
import { inArray, desc, like } from "drizzle-orm";
import { zfd } from "zod-form-data";
const load = async ({ url }) => {
  const params = url.searchParams;
  const allTags = params.getAll("tag");
  const collectionName = allTags.length == 0 ? "All Products" : allTags[0];
  let collectionTagline = "Everything we have to offer.";
  switch (collectionName) {
    case "Sediment Collection":
      collectionTagline = "Elegance. Frozen in glass.";
      break;
    case "Honor Collection":
      collectionTagline = "Crystallize your history.";
  }
  const sq = db.select({ id: productToProductTag.productId }).from(productToProductTag).where(allTags.length > 0 ? inArray(productToProductTag.tagId, allTags) : void 0);
  const newProductsQuery = await db.query.product.findMany({
    where: (product, { inArray: inArray2 }) => inArray2(product.id, sq),
    with: {
      tags: {
        where: (tags, { inArray: inArray2 }) => allTags.length > 0 ? inArray2(tags.tagId, allTags) : void 0
      },
      images: {
        orderBy: desc(productImage.isPrimary),
        limit: 1
      }
    },
    // TODO: Change to params
    limit: 6,
    offset: 0
  });
  return {
    products: newProductsQuery,
    collectionInfo: {
      name: collectionName,
      tagline: collectionTagline
    }
  };
};
const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const schema = zfd.formData({
      query: zfd.text()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      error(400, res.error.name);
    }
    const searchedTags = await db.select({
      tagName: productTag.name,
      tagDesc: productTag.desc
    }).from(productTag).where(like(productTag.name, `%${res.data.query}%`));
    return { searchedTags };
  }
};
export {
  actions,
  load
};
