import type { Config } from "drizzle-kit";
import 'dotenv/config';


export default {
  schema: "./src/lib/server/db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    //host: "us-east-1.sql.xata.sh",
	  //user: process.env.DATABASE_USERNAME,
    //password: process.env.DATABASE_PASSWORD,
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    //database: "Sveltekit-ecommerce:main",
  }
} satisfies Config;