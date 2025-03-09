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
  unique,
} from 'drizzle-orm/pg-core';

// represents each day's game definition
export const gamesTable = pgTable('games', {
  gameId: serial().primaryKey(),
  date: date().unique().notNull().defaultNow(),
  solution: varchar({ length: 5 }).notNull(),
  chosenBy: text(),
});

// represents each play of the game
export const playsTable = pgTable(
  'plays',
  {
    playId: uuid().primaryKey().defaultRandom(),
    playerId: uuid(), // might be null if cookies blocked
    gameId: integer()
      .notNull()
      .references(() => gamesTable.gameId), // which day/game
    guessCount: integer().notNull(), // not counted until they make initial guess
    solved: boolean().notNull().default(false),
    // startedAt: timestamp().notNull().defaultNow(), // consider adding in future
    firstGuessAt: timestamp().notNull().defaultNow(),
    lastGuessAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    // each player can only play a game once
    unique().on(table.playerId, table.gameId),
  ],
);

// word list, for cron to choose answers from
export const solutionsPoolTable = pgTable('solutions_pool', {
  word: varchar({ length: 5 }).primaryKey().notNull(),
  // isEligibleSolution: boolean().notNull().default(true), // consider adding in future
  createdAt: timestamp().notNull().defaultNow(), // unused, but why not
});
