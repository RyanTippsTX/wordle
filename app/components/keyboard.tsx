import { twMerge } from 'tailwind-merge';
import { useGameContext } from '~/context/GameContext';
import { Delete } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Keyboard() {
  return (
    <div
      className="w-full max-w-md
        flex flex-col items-center justify-center
        mx-auto space-y-1.5"
    >
      <KeyboardRow>
        <KeyboardKey eventKey="q" />
        <KeyboardKey eventKey="w" />
        <KeyboardKey eventKey="e" />
        <KeyboardKey eventKey="r" />
        <KeyboardKey eventKey="t" />
        <KeyboardKey eventKey="y" />
        <KeyboardKey eventKey="u" />
        <KeyboardKey eventKey="i" />
        <KeyboardKey eventKey="o" />
        <KeyboardKey eventKey="p" last />
      </KeyboardRow>
      <KeyboardRow>
        <KeyboardDeadSpace />
        <KeyboardKey eventKey="a" />
        <KeyboardKey eventKey="s" />
        <KeyboardKey eventKey="d" />
        <KeyboardKey eventKey="f" />
        <KeyboardKey eventKey="g" />
        <KeyboardKey eventKey="h" />
        <KeyboardKey eventKey="j" />
        <KeyboardKey eventKey="k" />
        <KeyboardKey eventKey="l" last />
        <KeyboardDeadSpace />
      </KeyboardRow>
      <KeyboardRow>
        <KeyboardKey eventKey="Enter" special />
        <KeyboardKey eventKey="z" />
        <KeyboardKey eventKey="x" />
        <KeyboardKey eventKey="c" />
        <KeyboardKey eventKey="v" />
        <KeyboardKey eventKey="b" />
        <KeyboardKey eventKey="n" />
        <KeyboardKey eventKey="m" />
        <KeyboardKey eventKey="Backspace" special last />
      </KeyboardRow>
    </div>
  );
}

const KeyboardRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full h-14">{children}</div>;
};

const KeyboardDeadSpace = () => {
  return <div className="flex-[0.5_1_0%]" />;
};

const KeyboardKey = ({
  eventKey: thisKey,
  special,
  last,
}: {
  eventKey: string;
  special?: boolean;
  last?: boolean;
}) => {
  const {
    solution,
    guessedLetters,
    guesses,
    currentRow,
    currentLetter,
    gameOver,
    setGuesses,
    handleKeyPress,
  } = useGameContext();

  const isGuessed = guessedLetters.has(thisKey);
  const isInSolution = solution.includes(thisKey);
  const isCorrect = guesses.some((guess) =>
    guess.some((letter, index) => letter === thisKey && solution[index] === letter),
  );

  // Add touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent default behavior
    handleKeyPress({ key: thisKey } as KeyboardEvent);
  };

  return (
    <div
      className={twMerge(
        !last && 'mr-1.5',
        special ? 'flex-[1.5_1_0%]' : 'flex-1',
        special ? 'text-xs tracking-tighter' : 'text-lg',
        'h-full flex items-center justify-center bg-neutral-400 text-white font-bold rounded cursor-pointer select-none',
        'active:brightness-[0.6]',
        !special &&
          isGuessed &&
          (isCorrect ? 'bg-green-500' : isInSolution ? 'bg-yellow-500' : 'bg-neutral-700'),
      )}
      onClick={() => handleKeyPress({ key: thisKey } as KeyboardEvent)}
      onTouchStart={handleTouchStart} // Add touch event handler
    >
      {thisKey === 'Enter' ? 'ENTER' : thisKey === 'Backspace' ? <Delete /> : thisKey.toUpperCase()}
    </div>
  );
};
