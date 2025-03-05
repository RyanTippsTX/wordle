import { twMerge } from 'tailwind-merge';
import { useGameContext } from '~/context/GameContext';

export function Board() {
  const { guesses, currentRow, currentLetter, chosenBy } = useGameContext();
  return (
    <div
      className="flex h-full w-full flex-col 
        items-center justify-center
        space-y-1.5
        "
    >
      {chosenBy && chosenBy.trim().length > 0 && (
        <div className="text-center mx-auto text-gray-300 text-lg pb-2 italic font-medium select-none">
          Today's word chosen by {chosenBy}
        </div>
      )}

      {new Array(6).fill(null).map((_, i) => (
        <Row key={i} rowIndex={i} />
      ))}
    </div>
  );
}

const Row = ({ rowIndex }: { rowIndex: number }) => {
  const { guesses, stagedGuess, currentRow, isShaking } = useGameContext();
  const isCurrentRow = rowIndex === currentRow;
  const shouldShake = isShaking && isCurrentRow;
  const letters = isCurrentRow ? stagedGuess : guesses[rowIndex];
  return (
    <div className={twMerge('flex gap-x-1.5', shouldShake && 'animate-shake')}>
      {new Array(5).fill(null).map((_, i) => (
        <Square key={i} letter={letters?.[i] || ' '} letterIndex={i} rowIndex={rowIndex} />
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
  const { guesses, solution, currentRow } = useGameContext();
  const correctLetter = solution[letterIndex];
  const submitted = currentRow > rowIndex;
  const isCorrect = submitted && letter === correctLetter;
  const isPresent = submitted && solution.includes(letter);

  return (
    <div
      //
      className={twMerge(
        'flex aspect-square w-12 sm:w-16 items-center justify-center text-3xl font-bold transition-colors duration-300 select-none',
        isCorrect
          ? 'bg-green-500'
          : isPresent
            ? 'bg-yellow-500'
            : submitted
              ? 'bg-neutral-700 border-2 border-neutral-700'
              : 'bg-transparent border-2 border-neutral-700',
      )}
    >
      {letter.toUpperCase()}
    </div>
  );
};
