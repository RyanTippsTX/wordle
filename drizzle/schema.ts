import {
  pgTable,
  unique,
  uuid,
  varchar,
  timestamp,
  serial,
  date,
  text,
  foreignKey,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const words = pgTable(
  'words',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    word: varchar({ length: 5 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [unique('words_word_unique').on(table.word)],
);

export const games = pgTable(
  'games',
  {
    id: serial().primaryKey().notNull(),
    date: date().defaultNow().notNull(),
    solution: varchar({ length: 5 }).notNull(),
    chosenBy: text('chosen_by'),
  },
  (table) => [unique('games_date_unique').on(table.date)],
);

export const plays = pgTable(
  'plays',
  {
    playerId: uuid('player_id'),
    gameId: integer('game_id').notNull(),
    guessCount: integer('guess_count').notNull(),
    solved: boolean().default(false).notNull(),
    firstGuessAt: timestamp('first_guess_at', { mode: 'string' }).defaultNow().notNull(),
    lastGuessAt: timestamp('last_guess_at', { mode: 'string' }).defaultNow().notNull(),
    id: uuid().defaultRandom().primaryKey().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.gameId],
      foreignColumns: [games.id],
      name: 'plays_game_id_games_id_fk',
    }),
    unique('plays_playerId_gameId_unique').on(table.playerId, table.gameId),
  ],
);
