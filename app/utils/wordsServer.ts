// Import the word list as a string
import { sql } from 'drizzle-orm';
import { db } from '~/db/db';
import { solutionsPoolTable } from '~/db/schema';

import { wordsArray } from './words';

// const wordArray = [
//   'shake',
//   'brake',
//   'steal',
//   // 'plead',
//   // 'trick',
//   // 'squad',
//   // 'shrug',
//   // 'speed',
//   // 'array',
//   // 'barns',
//   // 'panes',
//   // 'fetch',
//   // 'graze',
//   // 'crock',
//   // 'beard',
// ];

/**
 * Get a random word from the word list
 * @returns A random word from the word list
 */
export function getRandomWord(): string {
  return wordsArray[Math.floor(Math.random() * wordsArray.length)];
}

export const addWordsToDb = async (words: string[]) => {
  const wordsToAdd = words.filter((w) => w.length === 5).map((w) => ({ word: w }));
  // const result = await db
  //   .insert(solutionsPoolTable)
  //   .values(wordsToAdd)
  //   .onConflictDoNothing({
  //     target: [solutionsPoolTable.word],
  //   });
  // // .returning();
  // console.log('🔥 addWords result', result);
  // return result;
};

export const getRandomWordFromDb = async () => {
  // const result = await db
  //   .select()
  //   .from(solutionsPoolTable)
  //   .orderBy(sql`RANDOM()`)
  //   .limit(1);
  // return result[0].word;
};
