import { useGameContext } from '~/context/GameContext';
import { WordleIcon } from './wordle-icon';
import toast from 'react-hot-toast';
import { useState } from 'react';

export function Cover() {
  const { setStarted, setShowRules } = useGameContext();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      })
      .finally(() => {
        setTimeout(() => {
          setIsSharing(false);
        }, 300);
      });
  };

  return (
    <div className="absolute inset-0 text-black flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-3 w-16 h-16 flex items-center justify-center">
        <WordleIcon />
      </div>

      <div className="text-4xl font-bold mb-3 font-patua tracking-tight text-center">Tippsle</div>
      <div className="text-2xl font-light text-center mb-8 mx-4 max-w-xl">
        Get 6 chances to guess a 5-letter word.
        <br />
        First{' '}
        <span
          className="relative group"
          onMouseMove={(e) => {
            const tooltip = e.currentTarget.querySelector<HTMLElement>('.tooltip');
            if (tooltip) {
              const x = e.clientX;
              const y = e.clientY;
              tooltip.style.left = `${x + 10}px`;
              tooltip.style.top = `${y - 10}px`;
            }
          }}
        >
          <span className="hover:underline">
            winner<span className="align-super text-xs">*</span>
          </span>
          <span className="tooltip fixed z-50 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48">
            Winner means correct guess in 3 guesses or less
          </span>
        </span>{' '}
        picks tomorrow's word.
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="w-40 h-12 py-2 px-4 bg-black text-white rounded-full border border-black"
          onClick={() => setStarted(true)}
        >
          Play
        </button>
        <button
          onClick={() => setStarted(true)} // hack - rules get shown anyways, just looks better with 3 buttons 🤫
          className="w-40 h-12 py-2 px-4 text-black rounded-full border border-black"
        >
          Rules
        </button>
        <button
          className="w-40 h-12 py-2 px-4 text-black rounded-full border border-black"
          onClick={handleShare}
          disabled={isSharing}
        >
          Share
        </button>
      </div>

      <div className="mt-8 text-center">
        <div className="font-semibold text-sm">
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        <div className="text-sm">No. 1</div>
        <div className="text-sm">Edited by Ryan Tipps</div>
      </div>
    </div>
  );
}
