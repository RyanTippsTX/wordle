import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { db } from '../db/db';
import { gamesTable, guessesTable } from '../db/schema';
import { and, asc, eq, lte, sql } from 'drizzle-orm';
import { getTodaysDate, getTomorrowsDate } from './dates';

const fallBackGame: typeof gamesTable.$inferSelect = {
  gameId: 0,
  date: '2000-01-01',
  solution: 'broke',
  chosenBy: 'Elon M.',
};

const getTodaysWinner = async () => {
  const guesses = await db
    .select()
    .from(guessesTable)
    .leftJoin(gamesTable, eq(guessesTable.gameId, gamesTable.gameId))
    .where(
      and(
        eq(gamesTable.date, getTodaysDate()),
        eq(guessesTable.word, gamesTable.solution),
        lte(guessesTable.guessNumber, 3),
      ),
    )
    .orderBy(asc(guessesTable.guessedAt))
    .limit(1);

  const todaysWinner =
    guesses.length === 0
      ? null // no winner yet
      : guesses[0].guesses.playerId;

  return todaysWinner;
};

const checkTomorrowNeedsWord = async () => {
  const tomorrow = getTomorrowsDate();
  const games = await db //
    .select()
    .from(gamesTable)
    .where(eq(gamesTable.date, tomorrow));

  // cron generated games will NOT have a chosenBy
  const isChosen = !!games[0]?.chosenBy;
  return !isChosen;
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

export const checkEligibleForChooseTomorrowsGame = createServerFn({ method: 'GET' })
  .validator((data: { word: string }) => data)
  .handler(async ({ data }) => {
    const playerId = getCookie('playerId');

    if (!playerId) return false;

    const isWinner = playerId === (await getTodaysWinner());
    const tomorrowNeedsWord = await checkTomorrowNeedsWord();
    return isWinner && tomorrowNeedsWord;
  });

// export const chooseTomorrowsGame = createServerFn({ method: 'POST' })
//   .validator((data: { word: string }) => data)
//   .handler(async ({ data }) => {
//     const playerId = getCookie('playerId');
//     const game = await db.insert(gamesTable).values({
//       date: new Date().toISOString(),
//       solution: data.word,
//     });
//     return game;
//   });

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
    const today = getTodaysDate();

    const games = await db
      .select()
      .from(gamesTable)
      // .where(eq(gamesTable.gameId, 11))
      .where(eq(gamesTable.date, today));

    // console.log('🔥 games', games);
    const todaysGame = games[0];

    return todaysGame || fallBackGame;
  });

export const trackGuess = createServerFn({ method: 'POST' })
  .validator(
    (data: {
      //
      gameId: number;
      guessNumber: number;
      word: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    console.log('🔥 trackGuess', data);
    const playerId = getCookie('playerId');

    // dont track guesses for stale games
    const todaysGame = await getTodaysGame();
    if (todaysGame.gameId !== data.gameId) {
      console.error(
        'User playing stale game - guesses will not be tracked',
        todaysGame.gameId,
        data.gameId,
      );
      return;
    }
    // TODO: upsert instead of insert
    await db
      .insert(guessesTable)
      .values({
        ...data,
        playerId,
      })
      .onConflictDoNothing();
    // .returning();
    // console.log('🔥 saved guess', guess);
  });
