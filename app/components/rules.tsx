import { useGameContext } from '~/context/GameContext';
import { WordleIcon } from './wordle-icon';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function Rules() {
  const { setShowRules } = useGameContext();
  return (
    <div className="absolute inset-0 text-gray-100 flex flex-col items-center justify-center bg-neutral-900">
      <div
        className="absolute top-3 right-3 p-3 cursor-pointer"
        onClick={() => {
          setShowRules(false);
        }}
      >
        <X />
      </div>

      <div className="text-4xl font-extrabold mb-3 text-center">How to play</div>
      <div className="text-2xl font-light text-center mb-8">Guess the word in 6 tries</div>
    </div>
  );
}
