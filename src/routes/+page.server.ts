import { db } from '$lib/server/db';
import { productImage, productType, product, productTag, productToProductTag } from '$lib/server/db/schema';
import { desc, eq, sql } from 'drizzle-orm';

type SendCollection = {
    name: string;
    tagLine: string;
    productInfo: {
        cloudinaryId: string | null;
        secondaryCloudinary: string | null;
        name: string;
        availableSizes: string[];
        soldOutSizes: string[];
        link: string;
    }[];
    dark: boolean;
    collectionTag: string;
};

export const load = async () => {
    // Fetch collections with their associated products and images
    const collections = await db.select({
        tagName: productTag.name,
        tagDesc: productTag.description,
        productId: product.id,
        productName: product.name,
        imageCloudinaryId: productImage.cloudinaryId,
        imageOrder: productImage.order,
    })
    .from(productTag)
    .leftJoin(productToProductTag, eq(productTag.name, productToProductTag.tagId))
    .leftJoin(product, eq(productToProductTag.productId, product.id))
    .leftJoin(productImage, eq(product.id, productImage.productId))
    .orderBy(productTag.name, productImage.order);

    // Fetch all product types
    const productTypes = await db.select().from(productType);

    // Create a map for quick lookup of product types
    const productTypeMap = new Map(
        productTypes.map(pt => [pt.productId, pt])
    );

    // Process and transform the data
    const sendData: SendCollection[] = [];
    let currentCollection: SendCollection | null = null;

    collections.forEach((row) => {
        if (!currentCollection || currentCollection.name !== row.tagName) {
            if (currentCollection) {
                sendData.push(currentCollection);
            }
            currentCollection = {
                dark: true,
                collectionTag: row.tagName ?? '',
                name: row.tagName ?? '',
                tagLine: row.tagDesc ?? '',
                productInfo: []
            };
        }

        if (row.productId && row.productName && !currentCollection.productInfo.some(p => p.link === `/products/${row.productId}`)) {
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
            // Update secondary image if this is the second image for the product
            const product = currentCollection.productInfo.find(p => p.link === `/products/${row.productId}`);
            if (product) {
                product.secondaryCloudinary = row.imageCloudinaryId;
            }
        }
    });

    if (currentCollection) {
        sendData.push(currentCollection);
    }

    return { collections: sendData };
};