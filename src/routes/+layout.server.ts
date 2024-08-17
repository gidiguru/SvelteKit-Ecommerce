import { db } from '$lib/server/db/index';
import { order, product, productTag, productToProductTag, productType } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export const load = async ({ locals }: { locals: any }) => {
	// Fetch orders
	const orders = await db
		.select({
			id: order.orderId
		})
		.from(order);

	// Fetch collections (tags) with associated products
	const collections = await db
		.select({
			collection: productTag.name,
			name: product.name,
			id: product.id
		})
		.from(productTag)
		.innerJoin(productToProductTag, eq(productTag.name, productToProductTag.tagId))
		.innerJoin(product, eq(product.id, productToProductTag.productId));

	// Process collections data
	const reducedCollections = collections.reduce((acc, el) => {
		const existingCollection = acc.find(col => col.collection === el.collection);
		if (existingCollection) {
			existingCollection.products.push({ name: el.name, id: el.id });
		} else {
			acc.push({
				collection: el.collection,
				products: [{ name: el.name, id: el.id }]
			});
		}
		return acc;
	}, [] as {
		collection: string;
		products: { name: string; id: string; }[];
	}[]);

	// Fetch all product pieces with their types
	const pieces = await db
		.select({
			id: product.id,
			name: product.name,
			type: productType.name,
			price: productType.price,
			currency: productType.currency,
			isAvailable: productType.isAvailable
		})
		.from(product)
		.leftJoin(productType, eq(product.id, productType.productId));

	// Calculate availability
	const availablePieces = pieces.filter(piece => piece.isAvailable);
	const totalAvailable = availablePieces.length;
	const isSoldOut = totalAvailable === 0;

	return {
		user: locals.user,
		collections: reducedCollections,
		isSoldOut,
		numberLeft: totalAvailable,
		pieces: availablePieces
	};
};