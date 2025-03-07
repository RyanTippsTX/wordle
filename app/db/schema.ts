import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const db = drizzle(process.env.DATABASE_URL, {
  // casing: 'snake_case', // not working https://github.com/drizzle-team/drizzle-orm/issues/3094
});

// represents each day's game definition
export const gamesTable = pgTable('games', {
  id: serial().primaryKey(),
  date: date().unique().notNull().defaultNow(),
  solution: varchar({ length: 5 }).notNull(),
  chosenBy: text(),
});

// represents each play of the game
export const playsTable = pgTable('plays', {
  id: uuid().primaryKey().defaultRandom(),
  playerId: uuid(), // might be null if cookies blocked
  gameId: integer()
    .notNull()
    .references(() => gamesTable.id), // which day/game
  guessCount: integer().notNull(), // not counted until they make initial guess
  solved: boolean().notNull().default(false),
  // startedAt: timestamp().notNull().defaultNow(), // consider adding in future
  firstGuessAt: timestamp().notNull().defaultNow(),
  lastGuessAt: timestamp().notNull().defaultNow(),
});

// word list, for guesses & answers
export const wordsTable = pgTable('words', {
  id: uuid().primaryKey().defaultRandom(),
  word: varchar({ length: 5 }).unique().notNull(),
  // isEligibleSolution: boolean().notNull().default(true), // consider adding in future
  createdAt: timestamp().notNull().defaultNow(), // unused, but why not
});
