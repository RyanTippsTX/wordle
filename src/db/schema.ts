import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  serial,
  varchar,
  primaryKey,
} from 'drizzle-orm/pg-core';

// represents each day's game definition
export const gamesTable = pgTable('games', {
  gameId: serial().primaryKey(),
  date: date().unique().notNull().defaultNow(),
  solution: varchar({ length: 5 }).notNull(),
  chosenBy: text(),
});

export const guessesTable = pgTable(
  'guesses',
  {
    // playId: uuid().defaultRandom(), // not needed, infer from composite on gameId & playerId
    gameId: integer()
      .notNull()
      .references(() => gamesTable.gameId), // which day/game
    playerId: uuid(), // might be null if cookies blocked
    guessNumber: integer().notNull(),
    word: varchar({ length: 5 }).notNull(),
    // solved: boolean().notNull().default(false), // not needed, infer from join with games table
    guessedAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    // 6 guesses per player per day
    primaryKey({ columns: [table.gameId, table.playerId, table.guessNumber] }),
  ],
);

// word list, for cron to choose answers from
export const solutionsPoolTable = pgTable('solutions_pool', {
  word: varchar({ length: 5 }).primaryKey().notNull(),
  // isEligibleSolution: boolean().notNull().default(true), // consider adding in future
  createdAt: timestamp().notNull().defaultNow(), // unused, but why not
});
