import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const db = drizzle(process.env.DATABASE_URL, {
  // casing: 'snake_case', // not working https://github.com/drizzle-team/drizzle-orm/issues/3094
});
