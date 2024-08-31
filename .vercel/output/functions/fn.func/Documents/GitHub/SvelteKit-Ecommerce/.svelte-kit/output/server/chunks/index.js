import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "drizzle-orm";
import { varchar, pgTable, boolean, primaryKey, timestamp, text, integer, pgEnum, jsonb } from "drizzle-orm/pg-core";
import pg from "pg";
import dotenv__default from "dotenv";
const provider = varchar("provider", { enum: ["google", "github", "sgs"] });
const user = pgTable(
  "user",
  {
    id: varchar("id", { length: 100 }).unique().notNull(),
    provider: varchar("provider").notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    isAdmin: boolean("is_admin").notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    stripeCustomerId: varchar("stripe_customer_id", { length: 100 }).unique(),
    paystackCustomerId: varchar("paystack_customer_id", { length: 100 }).unique(),
    password: varchar("password", { length: 255 }),
    terms: boolean("terms"),
    token: varchar("token", { length: 255 }).unique(),
    verified: boolean("verified").default(false).notNull()
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.provider, table.providerId] })
    };
  }
);
const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  reviews: many(productReview)
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
  key: varchar("key", { length: 20 }).notNull()
});
const product = pgTable("product", {
  id: varchar("id", { length: 100 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  brand: varchar("brand", { length: 100 }).notNull(),
  baseCurrency: varchar("base_currency", { length: 3 }).notNull().default("USD"),
  gradientColorStart: varchar("gradient_color_start", { length: 20 }).notNull().default("from-red-600"),
  gradientColorVia: varchar("gradient_color_via", { length: 20 }).notNull().default("via-purple-500"),
  gradientColorStop: varchar("gradient_color_end", { length: 20 }).notNull().default("to-indigo-400")
});
const productType = pgTable("product_type", {
  productId: varchar("product_id", { length: 100 }).notNull(),
  name: varchar("name", { length: 255 }),
  sku: varchar("sku", { length: 100 }),
  isAvailable: boolean("is_available").notNull().default(true),
  width: integer("width"),
  height: integer("height"),
  weight: integer("weight"),
  rating: integer("rating"),
  price: integer("price").notNull(),
  discountPercentage: integer("discount_percentage"),
  stripePriceId: varchar("stripe_price_id", { length: 100 }).unique(),
  stock: integer("stock"),
  stripeProductId: varchar("stripe_product_id", { length: 100 }).unique(),
  paystackPlanId: varchar("paystack_plan_id", { length: 100 }).unique(),
  paystackProductId: varchar("paystack_product_id", { length: 100 }).unique(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD")
});
const productTypeRelations = relations(productType, ({ one }) => ({
  product: one(product, {
    fields: [productType.productId],
    references: [product.id]
  })
}));
const paymentGatewayProduct = pgTable("payment_gateway_product", {
  productTypeId: varchar("product_type_id", { length: 100 }).notNull(),
  gatewayName: varchar("gateway_name", { length: 50 }).notNull(),
  // 'stripe' or 'paystack'
  gatewayProductId: varchar("gateway_product_id", { length: 100 }).notNull(),
  gatewayPriceId: varchar("gateway_price_id", { length: 100 })
});
const paymentGatewayProductRelations = relations(paymentGatewayProduct, ({ one }) => ({
  productType: one(productType, {
    fields: [paymentGatewayProduct.productTypeId],
    references: [productType.productId]
  })
}));
const productRelations = relations(product, ({ many }) => ({
  productTypes: many(productType),
  tags: many(productToProductTag),
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
  description: text("desc").notNull()
});
const productTagRelations = relations(productTag, ({ many }) => ({
  products: many(productToProductTag)
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
  comment: text("comment"),
  userId: varchar("user_id", { length: 100 }).notNull(),
  productId: varchar("product_id", { length: 100 }),
  timestamp: timestamp("timestamp").$defaultFn(() => /* @__PURE__ */ new Date()),
  reviewerName: varchar("reviewer_name", { length: 100 }).notNull(),
  reviewerEmail: varchar("reviewer_email", { length: 100 }).notNull()
});
const productReviewRelations = relations(productReview, ({ one }) => ({
  product: one(product, {
    fields: [productReview.productId],
    references: [product.id]
  }),
  user: one(user, {
    // Add this relation
    fields: [productReview.userId],
    references: [user.id]
  })
}));
const status = pgEnum("status", ["new", "placed", "packaged", "sent"]);
const order = pgTable("order", {
  orderId: varchar("order_id", { length: 100 }).primaryKey(),
  userId: varchar("user_id", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  totalPrice: integer("total_price").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  timestamp: timestamp("timestamp").notNull(),
  status: status("status").notNull().default("new"),
  paymentGateway: varchar("payment_gateway", { length: 50 }).notNull(),
  // 'stripe' or 'paystack'
  gatewayOrderId: varchar("gateway_order_id", { length: 100 }).unique(),
  customerDetails: jsonb("customer_details").$type()
});
const paymentGatewayOrderRelations = relations(paymentGatewayProduct, ({ one }) => ({
  productType: one(order, {
    fields: [paymentGatewayProduct.gatewayProductId],
    references: [order.orderId]
  })
}));
const orderProduct = pgTable("order_product", {
  id: varchar("id", { length: 100 }).primaryKey(),
  orderId: varchar("order_id", { length: 100 }).notNull(),
  productTypeId: varchar("product_type_id", { length: 100 }).notNull(),
  quantity: integer("quantity").notNull(),
  priceAtOrder: integer("price_at_order").notNull(),
  currencyAtOrder: varchar("currency_at_order", { length: 3 }).notNull()
});
const orderProductRelations = relations(orderProduct, ({ one }) => ({
  order: one(order, {
    fields: [orderProduct.orderId],
    references: [order.orderId]
  }),
  productType: one(productType, {
    fields: [orderProduct.productTypeId],
    references: [productType.productId]
  })
}));
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  emailList,
  order,
  orderProduct,
  orderProductRelations,
  paymentGatewayOrderRelations,
  paymentGatewayProduct,
  paymentGatewayProductRelations,
  product,
  productImage,
  productImageRelations,
  productRelations,
  productReview,
  productReviewRelations,
  productTag,
  productTagRelations,
  productToProductTag,
  productToProductTagRelations,
  productType,
  productTypeRelations,
  provider,
  session,
  sessionRelations,
  status,
  user,
  userRelations
}, Symbol.toStringTag, { value: "Module" }));
dotenv__default.config();
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_CONNECTION_STRING });
const db = drizzle(pool, { schema });
export {
  orderProduct as a,
  product as b,
  productToProductTag as c,
  db as d,
  emailList as e,
  productType as f,
  productImage as g,
  productReview as h,
  order as o,
  productTag as p,
  session as s,
  user as u
};
