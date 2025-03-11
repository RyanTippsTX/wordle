import { useGameContext } from '~/context/GameContext';
import { Route } from '~/routes/_layout/index';

const useShareMessage = () => {
  const { gameId, chosenBy, solution } = Route.useLoaderData();
  const { gameOver, currentRow, guesses } = useGameContext();

  return getShareMessage({ gameId, chosenBy, solution, gameOver, currentRow, guesses });
};

export { useShareMessage };

function getShareMessage({
  gameId,
  chosenBy,
  solution,
  gameOver,
  currentRow,
  guesses,
}: {
  gameId: number;
  chosenBy: string | null;
  solution: string;
  gameOver: boolean;
  currentRow: number;
  guesses: string[][];
}) {
  if (!gameOver) return ''; // shouldn't ever happen

  const letterToEmoji = (letter: string, index: number) =>
    letter === solution[index] ? '🟩' : solution.includes(letter) ? '🟨' : '⬛';
  const lettersToEmojis = (guess: string[]) => guess.map(letterToEmoji).join('');

  const emojiGrid = guesses.map(lettersToEmojis).join('\n');

  const shareMessage = `Tippsle #${gameId} ${currentRow}/6${chosenBy ? `\n${chosenBy}'s word` : ''}

${emojiGrid}\n`;

  return shareMessage;
}

export function isMobile() {
  // Use navigator.userAgentData if available (modern browsers like Chrome, Edge)
  if (
    (navigator as any).userAgentData &&
    typeof (navigator as any).userAgentData.mobile === 'boolean'
  ) {
    return (navigator as any).userAgentData.mobile;
  }

  // Fallback: Use regex matching on the user agent string
  if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent)) {
    return true;
  }

  // Last resort: Check screen width (useful for responsive design)
  return window.innerWidth <= 768;
}
