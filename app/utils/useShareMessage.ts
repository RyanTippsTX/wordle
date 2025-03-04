import { useGameContext } from '~/context/GameContext';
import { Route } from '~/routes/_layout/index';

const useShareMessage = () => {
  const { id, chosenBy, solution } = Route.useLoaderData();
  const { gameOver, currentRow, guesses } = useGameContext();

  return getShareMessage({ id, chosenBy, solution, gameOver, currentRow, guesses });
};

export { useShareMessage };

function getShareMessage({
  id,
  chosenBy,
  solution,
  gameOver,
  currentRow,
  guesses,
}: {
  id: number;
  chosenBy: string | null;
  solution: string;
  gameOver: boolean;
  currentRow: number;
  guesses: string[][];
}) {
  const letterToEmoji = (letter: string, index: number) =>
    letter === solution[index] ? '🟩' : solution.includes(letter) ? '🟨' : '⬛';
  const lettersToEmojis = (guess: string[]) => guess.map(letterToEmoji).join('');

  const info = `Tippsle #${id} ${currentRow}/6${chosenBy ? `\n${chosenBy}'s word` : ''}`;
  const emojiGrid = guesses.slice(0, currentRow).map(lettersToEmojis).join('\n');

  return {
    info,
    emojiGrid,
  };
}
