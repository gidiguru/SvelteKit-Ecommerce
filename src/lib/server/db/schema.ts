import { relations } from 'drizzle-orm';
import {
	pgTable,
	text,
	integer,
	primaryKey,
	boolean,
	timestamp,
	varchar,
	pgEnum,
	serial,
	
} from 'drizzle-orm/pg-core';

export const provider = varchar('provider', {enum: ['google', 'github']});
export const user = pgTable(
	'user',
	{
		id: varchar('id', { length: 100 }).unique().notNull(),
		provider: varchar('provider').notNull(),
		providerId: varchar('provider_id', { length: 255 }).notNull(),
		firstName: varchar('first_name', { length: 100 }).notNull(),
		lastName: varchar('last_name', { length: 100 }).notNull(),
		isAdmin: boolean('is_admin').notNull(),
		email: varchar('email', { length: 100 }).notNull().unique(),
		stripeCustomerId: varchar('stripe_customer_id', { length: 100 }).unique()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.provider, table.providerId] })
		};
	}
);

export type NewUser = typeof user.$inferInsert;

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session)
}));

export const session = pgTable('session', {
	id: varchar('id', { length: 100 }).primaryKey(),
	userId: varchar('user_id', { length: 100 }).notNull(),
	expiresAt: timestamp('expires_at').notNull()
});

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const emailList = pgTable('email_list', {
	email: varchar('email', { length: 255 }).primaryKey(),
	subscribedAt: timestamp('subscribed_at').notNull(),
	unsubscribedAt: timestamp('unsubscribed_at'),
	// used to unsub
	key: varchar('key', { length: 20 }).notNull()
});

export const product = pgTable('product', {
	id: varchar('id', { length: 100 }).primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	desc: text('desc').notNull(),
	gradientColorStart: varchar('gradient_color_start', { length: 20 })
		.notNull()
		.default('from-red-600'),
	gradientColorVia: varchar('gradient_color_via', { length: 20 })
		.notNull()
		.default('via-purple-500'),
	gradientColorStop: varchar('gradient_color_end', { length: 20 })
		.notNull()
		.default('to-indigo-400')
});

export const productRelations = relations(product, ({ many }) => ({
	tags: many(productToProductTag),
	sizes: many(productSize),
	images: many(productImage),
	reviews: many(productReview)
}));

export const productToProductTag = pgTable(
	'product_to_product_tag',
	{
		productId: varchar('product_id', { length: 100 }).notNull(),
		tagId: varchar('tag_id', { length: 100 }).notNull()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.productId, table.tagId] })
		};
	}
);

export const productToProductTagRelations = relations(productToProductTag, ({ one }) => ({
	product: one(product, {
		fields: [productToProductTag.productId],
		references: [product.id]
	}),
	tag: one(productTag, {
		fields: [productToProductTag.tagId],
		references: [productTag.name]
	})
}));

export const productTag = pgTable('product_tag', {
	name: varchar('name', { length: 100 }).primaryKey(),
	desc: text('desc').notNull()
});

export const productTagRelations = relations(productTag, ({ many }) => ({
	products: many(productToProductTag)
}));

export const productSize = pgTable('product_size', {
	code: varchar('code', { length: 100 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull().default('my product'),
	isAvailable: boolean('is_available').notNull().default(true),
	width: integer('width').notNull(),
	height: integer('height').notNull(),
	price: integer('price').notNull(),
	stripePriceId: varchar('stripe_price_id', { length: 100 }).notNull(),
	stripeProductId: varchar('stripe_product_id', { length: 100 }).notNull(),
	productId: varchar('product_id', { length: 100 }).notNull()
});

export const productSizeRelations = relations(productSize, ({ one }) => ({
	product: one(product, {
		fields: [productSize.productId],
		references: [product.id]
	})
}));

export const productImage = pgTable('product_image', {
	cloudinaryId: varchar('cloudinary_id', { length: 255 }).primaryKey(),
	productId: varchar('product_id', { length: 100 }).notNull(),
	width: integer('width').notNull(),
	height: integer('height').notNull(),
	isVertical: boolean('is_vertical').notNull().default(false),
	order: integer('order').notNull().default(0),
	isPrimary: boolean('is_primary').default(false).notNull()
});

export const productImageRelations = relations(productImage, ({ one }) => ({
	product: one(product, {
		fields: [productImage.productId],
		references: [product.id]
	})
}));

export const productReview = pgTable('product_review', {
	id: varchar('id', { length: 100 }).primaryKey(),
	rating: integer('rating').notNull(),
	reviewText: text('review_text'),
	productId: varchar('product_id', { length: 100 }),
	timestamp: timestamp('timestamp').$defaultFn(() => new Date())
});

export const productReviewRelations = relations(productReview, ({ one }) => ({
	product: one(product, {
		fields: [productReview.productId],
		references: [product.id]
	})
}));

export const status = pgEnum('status', ['new', 'placed', 'packaged', 'sent']);

export const order = pgTable('order', {
	// this is really the checkout session id
	stripeOrderId: varchar('stripe_order_id', { length: 100 }).primaryKey(),
	stripeCustomerId: varchar('stripe_customer_id', { length: 100 }),
	totalPrice: integer('total_price').notNull(),
	timestamp: timestamp('timestamp').notNull(),
	status: status('status').notNull().default('new')
});

export const orderRelations = relations(order, ({ many }) => ({
	products: many(orderProduct)
}));

export const orderProduct = pgTable('order_product', {
	id: varchar('id', { length: 20 }).primaryKey(),
	productSizeCode: varchar('product_size_code', { length: 100 }).notNull(),
	quantity: integer('quantity').notNull(),
	orderId: varchar('order_id', { length: 100 }).notNull()
});

export const orderProductRelations = relations(orderProduct, ({ one }) => ({
	order: one(order, {
		fields: [orderProduct.orderId],
		references: [order.stripeOrderId]
	})
}));
