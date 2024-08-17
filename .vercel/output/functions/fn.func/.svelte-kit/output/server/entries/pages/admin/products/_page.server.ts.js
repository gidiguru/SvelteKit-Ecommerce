import { e as ensureAdmin } from "../../../../chunks/auth.js";
import { f as fetchAllProducts } from "../../../../chunks/products.js";
import { d as db, f as productType, a as product } from "../../../../chunks/index.js";
import { parse } from "csv-parse";
import { generateId } from "lucia";
const load = async ({ locals }) => {
  ensureAdmin(locals);
  const products = await fetchAllProducts(10, 0);
  return { products };
};
const actions = {
  default: async (event) => {
    ensureAdmin(event.locals);
    const formData = await event.request.formData();
    const priceFile = formData.get("prices");
    const csvData = await parseCSV(priceFile);
    const createdProducts = [];
    for (let i = 0; i < csvData.length; i++) {
      const entry = csvData[i];
      const entryProductName = entry["Product Name"].split(",")[0] ?? "";
      const productIdx = createdProducts.findIndex((v) => v.name === entryProductName);
      if (productIdx >= 0) {
        await db.insert(productType).values({
          name: entry["Product Name"].split(",")[1].trim() ?? "",
          price: entry.Amount * 100,
          stripePriceId: entry["Price ID"],
          stripeProductId: entry["Product ID"],
          productId: createdProducts[productIdx].id,
          width: entry.Width,
          height: entry.Height,
          code: entry.Code
        });
      } else {
        const nId = generateId(40);
        await db.insert(product).values({
          id: nId,
          name: entryProductName,
          desc: ""
        });
        createdProducts.push({
          name: entryProductName,
          id: nId
        });
        await db.insert(productType).values({
          width: entry.Width,
          height: entry.Height,
          code: entry.Code,
          name: entry["Product Name"].split(",")[1].trim() ?? "",
          price: entry.Amount * 100,
          stripePriceId: entry["Price ID"],
          stripeProductId: entry["Product ID"],
          productId: nId
        });
      }
    }
    return { success: true };
  }
};
async function parseCSV(csvFile) {
  return new Promise((resolve, reject) => {
    const results = [];
    const textDecoder = new TextDecoder("utf-8");
    const csvParseStream = parse({ delimiter: ",", columns: true });
    const reader = csvFile.stream().getReader();
    const readChunk = async () => {
      const { done, value } = await reader.read();
      if (done) {
        csvParseStream.end();
      } else {
        const chunkString = textDecoder.decode(value);
        csvParseStream.write(chunkString);
        readChunk();
      }
    };
    reader.read().then(async ({ done, value }) => {
      if (!done) {
        const chunkString = textDecoder.decode(value);
        csvParseStream.write(chunkString);
        readChunk();
      }
    });
    csvParseStream.on("readable", () => {
      let record;
      while (record = csvParseStream.read()) {
        results.push(record);
      }
    });
    csvParseStream.on("error", (error) => {
      reject(error);
    });
    csvParseStream.on("end", () => {
      resolve(results);
    });
  });
}
export {
  actions,
  load
};
