// Import the word list as a string
import wordList from './words.txt?raw';

const wordArray = wordList
  .split('\n')
  .map((word) => word.trim())
  .filter(Boolean);

// Convert the word list to a Set for efficient lookups
const wordSet = new Set(wordArray);

/**
 * Checks if a word is valid according to the word list
 * @param word The word to validate
 * @returns True if the word is in the word list, false otherwise
 */
export function isValidWord(word: string): boolean {
  return wordSet.has(word.toLowerCase());
}

/**
 * Get a random word from the word list
 * @returns A random word from the word list
 */
export function getRandomWord(): string {
  const words = Array.from(wordSet);
  return words[Math.floor(Math.random() * words.length)];
}
