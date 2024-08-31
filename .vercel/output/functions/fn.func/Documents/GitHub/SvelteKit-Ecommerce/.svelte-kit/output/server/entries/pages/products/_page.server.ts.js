import { d as db, c as productToProductTag, g as productImage, p as productTag } from "../../../chunks/index.js";
import { e as error } from "../../../chunks/index2.js";
import { inArray, desc, like } from "drizzle-orm";
import { zfd } from "zod-form-data";
const load = async ({ url }) => {
  console.log("Starting load function");
  const params = url.searchParams;
  const allTags = params.getAll("tag");
  console.log("Retrieved tags:", allTags);
  const collectionName = allTags.length == 0 ? "All Products" : allTags[0];
  let collectionTagline = "Everything we have to offer.";
  switch (collectionName) {
    case "Sediment Collection":
      collectionTagline = "Elegance. Frozen in glass.";
      break;
    case "Honor Collection":
      collectionTagline = "Crystallize your history.";
  }
  console.log("Collection Name:", collectionName);
  console.log("Collection Tagline:", collectionTagline);
  const sq = db.select({ id: productToProductTag.productId }).from(productToProductTag).where(allTags.length > 0 ? inArray(productToProductTag.tagId, allTags) : void 0);
  console.log("Executing product query");
  const newProductsQuery = await db.query.product.findMany({
    where: (product, { inArray: inArray2 }) => inArray2(product.id, sq),
    with: {
      tags: {
        where: (tags, { inArray: inArray2 }) => allTags.length > 0 ? inArray2(tags.tagId, allTags) : void 0
      },
      images: {
        orderBy: desc(productImage.isPrimary),
        limit: 1
      },
      productTypes: true
    },
    // TODO: Change to params
    limit: 6,
    offset: 0
  });
  console.log("Retrieved products:", newProductsQuery.length);
  console.log("Returning load result");
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
    console.log("Starting default action");
    const data = await request.formData();
    const schema = zfd.formData({
      query: zfd.text()
    });
    const res = schema.safeParse(data);
    if (!res.success) {
      console.error("Schema validation failed:", res.error.name);
      error(400, res.error.name);
    }
    console.log("Searching for tags with query:", res.data.query);
    const searchedTags = await db.select({
      tagName: productTag.name,
      tagDesc: productTag.description
    }).from(productTag).where(like(productTag.name, `%${res.data.query}%`));
    console.log("Found tags:", searchedTags.length);
    return { searchedTags };
  }
};
export {
  actions,
  load
};
