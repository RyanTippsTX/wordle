import { twMerge } from 'tailwind-merge';
import { useGameContext } from '~/context/GameContext';

export function Keyboard() {
  return (
    <div
      className="flex w-full flex-col 
        items-center justify-center
        space-y-1
        "
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
        <KeyboardKey eventKey="p" />
      </KeyboardRow>
      <KeyboardRow>
        <KeyboardKey eventKey="a" />
        <KeyboardKey eventKey="s" />
        <KeyboardKey eventKey="d" />
        <KeyboardKey eventKey="f" />
        <KeyboardKey eventKey="g" />
        <KeyboardKey eventKey="h" />
        <KeyboardKey eventKey="j" />
        <KeyboardKey eventKey="k" />
        <KeyboardKey eventKey="l" />
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
        <KeyboardKey eventKey="Backspace" special />
      </KeyboardRow>
    </div>
  );
}

const KeyboardRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-x-1">{children}</div>;
};

const KeyboardKey = ({ eventKey: thisKey, special }: { eventKey: string; special?: boolean }) => {
  const {
    wordle,
    guessedLetters,
    guesses,
    pastGuesses,
    currentRow,
    currentLetter,
    gameOver,
    setGuesses,
    setCurrentRow,
  } = useGameContext();

  const isGuessed = guessedLetters.has(thisKey);
  const isInWordle = wordle.includes(thisKey);
  const isCorrect = pastGuesses.some((guess) =>
    guess.some((letter, index) => letter === thisKey && wordle[index] === letter),
  );

  console.log('🔥 key', { eventKey: thisKey, isGuessed, isInWordle, isCorrect });

  return (
    <div
      //
      className={twMerge(
        special ? 'w-12' : 'w-8',
        special ? 'text-xs tracking-tighter' : 'text-lg',
        'flex h-12 items-center justify-center bg-neutral-400 text-white font-bold rounded',
        !special &&
          isGuessed &&
          (isCorrect ? 'bg-green-500' : isInWordle ? 'bg-yellow-500' : 'bg-neutral-700'),
      )}
    >
      {thisKey === 'Enter' ? 'ENTER' : thisKey === 'Backspace' ? 'DELETE' : thisKey.toUpperCase()}
    </div>
  );
};
