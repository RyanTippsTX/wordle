import { drizzle } from 'drizzle-orm/neon-http';

// hacky fix, if error persists then wrap this in a db init function
const isServer = () => typeof window === 'undefined';
if (!isServer()) throw new Error('Ignore this error if you are on the client on localhost.');

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const db = drizzle({
  connection: process.env.DATABASE_URL,
  casing: 'snake_case',
});
