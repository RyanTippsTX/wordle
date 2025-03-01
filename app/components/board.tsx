import { twMerge } from 'tailwind-merge';
import { useGameContext } from '~/context/GameContext';

export function Board() {
  const { guesses, currentRow, currentLetter } = useGameContext();
  return (
    <div
      className="flex h-full w-full flex-col 
        items-center justify-center
        space-y-1.5
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

  return (
    <div className="flex gap-x-1.5">
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
  const submitted = currentRow > rowIndex;
  const isCorrect = submitted && letter === correctLetter;
  const isPresent = submitted && wordle.includes(letter);

  return (
    <div
      //
      className={twMerge(
        'flex aspect-square w-14 sm:w-16 items-center justify-center text-3xl font-bold',
        isCorrect
          ? 'bg-green-500'
          : isPresent
            ? 'bg-yellow-500'
            : 'bg-neutral-700 border-2 border-neutral-700',
      )}
    >
      {letter.toUpperCase()}
    </div>
  );
};
