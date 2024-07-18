import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config()


const client = new pg.Client({ connectionString: process.env.DATABASE_CONNECTION_STRING });
export const db = drizzle(client, { schema });
