// Import the word list as a string
import { sql } from 'drizzle-orm';
import { db } from '~/db/db';
import { wordsTable } from '~/db/schema';
import words from './words.txt?raw';

const wordArray = words
  .split('\n')
  .map((word) => word.trim())
  .filter(Boolean);

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
  return wordArray[Math.floor(Math.random() * wordArray.length)];
}

export const addWordsToDb = async (words: string[]) => {
  const wordsToAdd = words.filter((w) => w.length === 5).map((w) => ({ word: w }));
  const result = await db
    .insert(wordsTable)
    .values(wordsToAdd)
    .onConflictDoNothing({
      target: [wordsTable.word],
    });
  // .returning();
  console.log('🔥 addWords result', result);
  return result;
};

export const getRandomWordFromDb = async () => {
  const result = await db
    .select()
    .from(wordsTable)
    .orderBy(sql`RANDOM()`)
    .limit(1);
  return result[0].word;
};
