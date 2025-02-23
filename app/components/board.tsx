import { twMerge } from 'tailwind-merge';
import { useGameContext } from '~/context/GameContext';

export function Board() {
  const { guesses, currentRow, currentLetter } = useGameContext();
  return (
    <div
      className="flex h-full w-full flex-col 
        items-center justify-center
        space-y-1
        "
    >
      {guesses.map((guess, index) => (
        <Row key={index} rowIndex={index} />
      ))}
    </div>
  );
}

const Row = ({ rowIndex }: { rowIndex: number }) => {
  const { guesses, wordle } = useGameContext();
  const guess = guesses[rowIndex];
  const untypedLetters = 5 - guess.length;
  const letters = [...guess, ...Array(untypedLetters).fill(' ')];
  const correctLetters = wordle.split('');

  return (
    <div className="flex gap-x-1">
      {letters.map((letter, letterIndex) => (
        <Square key={letterIndex} letter={letter} letterIndex={letterIndex} rowIndex={rowIndex} />
      ))}
    </div>
  );
};

const Square = ({
  letter,
  letterIndex,
  rowIndex,
}: {
  letter: string;
  letterIndex: number;
  rowIndex: number;
}) => {
  const { guesses, wordle, currentRow } = useGameContext();
  const correctLetter = wordle[letterIndex];
  const isCorrect = letter === correctLetter;
  const isPresent = wordle.includes(letter);
  const showColors = currentRow > rowIndex;

  return (
    <div
      //
      className={twMerge(
        'flex h-16 w-16 items-center justify-center text-sm tracking-tighter border-2 border-neutral-700',
        showColors && (isCorrect ? 'bg-green-500' : isPresent ? 'bg-yellow-500' : 'bg-neutral-700'),
      )}
    >
      {letter}
    </div>
  );
};
