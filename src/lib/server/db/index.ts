import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config()

const { Pool } = pg;

    //connect to db
    const pool = new Pool({ connectionString: process.env.DATABASE_CONNECTION_STRING });
    export const db = drizzle(pool, { schema });
    //export default pool
