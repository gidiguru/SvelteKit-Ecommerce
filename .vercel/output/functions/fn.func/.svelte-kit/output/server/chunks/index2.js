import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, varchar, boolean, primaryKey, timestamp, text, integer } from "drizzle-orm/pg-core";
import pg from "pg";
import dotenv from "dotenv";
const provider = pgEnum("provider", ["google", "github"]);
const user = pgTable(
  "user",
  {
    id: varchar("id", { length: 100 }).unique().notNull(),
    provider: provider("provider").notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    isAdmin: boolean("is_admin").notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    stripeCustomerId: varchar("stripe_customer_id", { length: 100 }).unique()
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.provider, table.providerId] })
    };
  }
);
const userRelations = relations(user, ({ many }) => ({
  sessions: many(session)
}));
const session = pgTable("session", {
  id: varchar("id", { length: 100 }).primaryKey(),
  userId: varchar("user_id", { length: 100 }).notNull(),
  expiresAt: timestamp("expires_at").notNull()
});
const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  })
}));
const emailList = pgTable("email_list", {
  email: varchar("email", { length: 255 }).primaryKey(),
  subscribedAt: timestamp("subscribed_at").notNull(),
  unsubscribedAt: timestamp("unsubscribed_at"),
  // used to unsub
  key: varchar("key", { length: 20 }).notNull()
});
const product = pgTable("product", {
  id: varchar("id", { length: 100 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  desc: text("desc").notNull(),
  gradientColorStart: varchar("gradient_color_start", { length: 20 }).notNull().default("from-red-600"),
  gradientColorVia: varchar("gradient_color_via", { length: 20 }).notNull().default("via-purple-500"),
  gradientColorStop: varchar("gradient_color_end", { length: 20 }).notNull().default("to-indigo-400")
});
const productRelations = relations(product, ({ many }) => ({
  tags: many(productToProductTag),
  sizes: many(productSize),
  images: many(productImage),
  reviews: many(productReview)
}));
const productToProductTag = pgTable(
  "product_to_product_tag",
  {
    productId: varchar("product_id", { length: 100 }).notNull(),
    tagId: varchar("tag_id", { length: 100 }).notNull()
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.productId, table.tagId] })
    };
  }
);
const productToProductTagRelations = relations(productToProductTag, ({ one }) => ({
  product: one(product, {
    fields: [productToProductTag.productId],
    references: [product.id]
  }),
  tag: one(productTag, {
    fields: [productToProductTag.tagId],
    references: [productTag.name]
  })
}));
const productTag = pgTable("product_tag", {
  name: varchar("name", { length: 100 }).primaryKey(),
  desc: text("desc").notNull()
});
const productTagRelations = relations(productTag, ({ many }) => ({
  products: many(productToProductTag)
}));
const productSize = pgTable("product_size", {
  code: varchar("code", { length: 100 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull().default("my product"),
  isAvailable: boolean("is_available").notNull().default(true),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  price: integer("price").notNull(),
  stripePriceId: varchar("stripe_price_id", { length: 100 }).notNull(),
  stripeProductId: varchar("stripe_product_id", { length: 100 }).notNull(),
  productId: varchar("product_id", { length: 100 }).notNull()
});
const productSizeRelations = relations(productSize, ({ one }) => ({
  product: one(product, {
    fields: [productSize.productId],
    references: [product.id]
  })
}));
const productImage = pgTable("product_image", {
  cloudinaryId: varchar("cloudinary_id", { length: 255 }).primaryKey(),
  productId: varchar("product_id", { length: 100 }).notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  isVertical: boolean("is_vertical").notNull().default(false),
  order: integer("order").notNull().default(0),
  isPrimary: boolean("is_primary").default(false).notNull()
});
const productImageRelations = relations(productImage, ({ one }) => ({
  product: one(product, {
    fields: [productImage.productId],
    references: [product.id]
  })
}));
const productReview = pgTable("product_review", {
  id: varchar("id", { length: 100 }).primaryKey(),
  rating: integer("rating").notNull(),
  reviewText: text("review_text"),
  productId: varchar("product_id", { length: 100 }),
  timestamp: timestamp("timestamp").$defaultFn(() => /* @__PURE__ */ new Date())
});
const productReviewRelations = relations(productReview, ({ one }) => ({
  product: one(product, {
    fields: [productReview.productId],
    references: [product.id]
  })
}));
const status = pgEnum("status", ["new", "placed", "packaged", "sent"]);
const order = pgTable("order", {
  // this is really the checkout session id
  stripeOrderId: varchar("stripe_order_id", { length: 100 }).primaryKey(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 100 }),
  totalPrice: integer("total_price").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  status: status("status").notNull().default("new")
});
const orderRelations = relations(order, ({ many }) => ({
  products: many(orderProduct)
}));
const orderProduct = pgTable("order_product", {
  id: varchar("id", { length: 20 }).primaryKey(),
  productSizeCode: varchar("product_size_code", { length: 100 }).notNull(),
  quantity: integer("quantity").notNull(),
  orderId: varchar("order_id", { length: 100 }).notNull()
});
const orderProductRelations = relations(orderProduct, ({ one }) => ({
  order: one(order, {
    fields: [orderProduct.orderId],
    references: [order.stripeOrderId]
  })
}));
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  emailList,
  order,
  orderProduct,
  orderProductRelations,
  orderRelations,
  product,
  productImage,
  productImageRelations,
  productRelations,
  productReview,
  productReviewRelations,
  productSize,
  productSizeRelations,
  productTag,
  productTagRelations,
  productToProductTag,
  productToProductTagRelations,
  provider,
  session,
  sessionRelations,
  status,
  user,
  userRelations
}, Symbol.toStringTag, { value: "Module" }));
dotenv.config();
const client = new pg.Client({ connectionString: process.env.DATABASE_CONNECTION_STRING });
const db = drizzle(client, { schema });
export {
  product as a,
  productToProductTag as b,
  productImage as c,
  db as d,
  emailList as e,
  productSize as f,
  productReview as g,
  orderProduct as h,
  order as o,
  productTag as p,
  session as s,
  user as u
};
