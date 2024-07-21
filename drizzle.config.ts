import { defineConfig } from "drizzle-kit";
import {config} from "dotenv";
config({ path: ".env"});

export default defineConfig ({
  schema: "./src/lib/server/db/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_STRING
  } as {url: string}
});