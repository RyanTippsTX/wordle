import { createServerFn } from '@tanstack/start';
import { db, gamesTable } from '../db/schema';
import { eq } from 'drizzle-orm';

const fallBackGame: typeof gamesTable.$inferSelect = {
  id: 0,
  date: '1999-12-31',
  solution: 'house',
  chosenBy: 'Doris T.',
};

export const getTodaysGame = createServerFn({ method: 'GET' })
  // .validator((id: string) => id)
  .handler(async ({ data }) => {
    /** YYYY-MM-DD in server's timezone */
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Chicago', // Central Time (CST/CDT)
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());

    const games = await db
      .select()
      .from(gamesTable)
      // .where(eq(gamesTable.id, 11))
      .where(eq(gamesTable.date, today));

    const todaysGame = games[0];
    console.log('🔥 todaysGame', todaysGame);

    return todaysGame || fallBackGame;
  });

export const saveGameState = createServerFn({ method: 'POST' })
  .validator((data: { url: string; ttl: number }) => data)
  .handler(async ({ data }) => {
    console.log('🔥 ', data);
  });
