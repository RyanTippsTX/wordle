import { useState } from 'react';
import { WordleIcon } from './wordle-icon';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
import { useGameContext } from '~/context/GameContext';

const shareMessage = `Wordle War 1,234 3/6
Cameron's word

🟨⬛⬛⬛🟨
🟩🟩🟩⬛⬛
🟩🟩🟩🟩🟩`;

export function End() {
  const { setShowEnd } = useGameContext();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 400);
  };

  return (
    <div className="absolute inset-0 text-gray-100 flex flex-col items-center justify-center bg-neutral-900">
      <div
        className="absolute top-3 right-3 p-3 cursor-pointer"
        onClick={() => {
          setShowEnd(false);
        }}
      >
        <X />
      </div>
      <div
        className={twMerge(
          'mb-3 w-16 h-16 flex items-center justify-center',
          isSpinning && 'animate-rapid-spin',
        )}
      >
        <WordleIcon />
      </div>

      <div className="text-4xl font-extrabold mb-3 text-center">Thanks for playing today!</div>
      <div className="text-2xl font-light text-center mb-8">See you tomorrow?</div>

      <button
        className="w-40 h-12 py-2 px-4 bg-gray-100 text-black rounded-full border border-black"
        onClick={() => {
          handleSpin();
          navigator.clipboard.writeText(shareMessage);
        }}
        disabled={isSpinning}
      >
        Share
      </button>
    </div>
  );
}
