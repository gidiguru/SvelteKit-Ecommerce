DO $$ BEGIN
 CREATE TYPE "public"."provider" AS ENUM('google', 'github');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('new', 'placed', 'packaged', 'sent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_list" (
	"email" varchar(255) PRIMARY KEY NOT NULL,
	"subscribed_at" timestamp NOT NULL,
	"unsubscribed_at" timestamp,
	"key" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"stripe_order_id" varchar(100) PRIMARY KEY NOT NULL,
	"stripe_customer_id" varchar(100),
	"total_price" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	"status" "status" DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_product" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"product_size_code" varchar(100) NOT NULL,
	"quantity" integer NOT NULL,
	"order_id" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"desc" text NOT NULL,
	"gradient_color_start" varchar(20) DEFAULT 'from-red-600' NOT NULL,
	"gradient_color_via" varchar(20) DEFAULT 'via-purple-500' NOT NULL,
	"gradient_color_end" varchar(20) DEFAULT 'to-indigo-400' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_image" (
	"cloudinary_id" varchar(255) PRIMARY KEY NOT NULL,
	"product_id" varchar(100) NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"is_vertical" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_review" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"review_text" text,
	"product_id" varchar(100),
	"timestamp" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_size" (
	"code" varchar(100) PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT 'my product' NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"price" integer NOT NULL,
	"stripe_price_id" varchar(100) NOT NULL,
	"stripe_product_id" varchar(100) NOT NULL,
	"product_id" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_tag" (
	"name" varchar(100) PRIMARY KEY NOT NULL,
	"desc" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_to_product_tag" (
	"product_id" varchar(100) NOT NULL,
	"tag_id" varchar(100) NOT NULL,
	CONSTRAINT "product_to_product_tag_product_id_tag_id_pk" PRIMARY KEY("product_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(100) NOT NULL,
	"provider" "provider" NOT NULL,
	"provider_id" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"is_admin" boolean NOT NULL,
	"email" varchar(100) NOT NULL,
	"stripe_customer_id" varchar(100),
	CONSTRAINT "user_provider_provider_id_pk" PRIMARY KEY("provider","provider_id"),
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
