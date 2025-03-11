import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { db } from '../db/db';
import { gamesTable, playsTable } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

const fallBackGame: typeof gamesTable.$inferSelect = {
  gameId: 0,
  date: '1999-12-31',
  solution: 'broke',
  chosenBy: 'Broken Robot',
};

// export const generateNextGame = async () => {
//   const randomWord = getRandomWord();
//   const word = await db.insert(solutionsPoolTable).values({
//     word: randomWord,
//   });
//   const game = await db.insert(gamesTable).values({
//     date: new Date().toISOString(),
//     solution: randomWord,
//   });
//   return { game, word };
// };

export const getTodaysGame = createServerFn({ method: 'GET' })
  // .validator((id: string) => id)
  .handler(async ({ data }) => {
    const playerId = getCookie('playerId');
    // console.log('🔥 getCookie playerId', playerId);

    if (!playerId) {
      // generate a new playerId, no need to save in db. Many will be thrown away before they ever play a game.
      const uuid = crypto.randomUUID();
      setCookie('playerId', uuid, {
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
        sameSite: 'strict', // only sent in same-site requests
      });
      // console.log('🔥 setCookie playerId', uuid);
    }

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
      // .where(eq(gamesTable.gameId, 11))
      .where(eq(gamesTable.date, today));

    console.log('🔥 games', games);
    const todaysGame = games[0];

    return todaysGame || fallBackGame;
  });

export const trackPlayInstance = createServerFn({ method: 'POST' })
  .validator(
    (data: {
      //
      gameId: number;
      guessCount: number;
      solved: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    console.log('🔥 trackPlayInstance', data);
    const playerId = getCookie('playerId');

    // TODO: upsert instead of insert
    const play = await db
      .insert(playsTable)
      .values({ ...data, playerId })
      .onConflictDoUpdate({
        target: [playsTable.playerId, playsTable.gameId],
        set: {
          guessCount: data.guessCount,
          solved: data.solved,
          lastGuessAt: sql`CURRENT_TIMESTAMP`,
        },
      });
    // .returning();
    console.log('🔥 saved play', play);
  });
