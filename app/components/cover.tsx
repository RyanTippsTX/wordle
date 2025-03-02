import { useGameContext } from '~/context/GameContext';
import { WordleIcon } from './wordle-icon';
import toast from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import { Route } from '~/routes/_layout/index';
import { formatDate } from '~/utils/dates';

export function Cover() {
  const todaysGame = Route.useLoaderData();
  const { setStarted } = useGameContext();
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

  const playGame = useCallback(() => {
    setStarted(true);
  }, [setStarted]);

  // Enter key will start game too
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        playGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playGame]);

  return (
    <div className="absolute inset-0 text-black flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-3 w-16 h-16 flex items-center justify-center">
        <WordleIcon />
      </div>

      <div className="text-4xl font-bold mb-3 font-patua tracking-tight text-center">Tippsle</div>
      <div className="text-2xl font-light text-center mb-8 mx-4 max-w-xl">
        Get 6 chances to guess a 5-letter word.
        <br />
        <span
          className="relative group"
          onMouseMove={(e) => {
            const tooltip = e.currentTarget.querySelector<HTMLElement>('.tooltip');
            if (tooltip) {
              const x = e.clientX;
              const y = e.clientY;
              tooltip.style.left = `${x}px`;
              tooltip.style.top = `${y}px`;
            }
          }}
        >
          <span className="hover:underline cursor-help">
            First winner<span className="align-super text-xs">*</span>
          </span>
          <span className="tooltip fixed z-50 p-2 bg-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none min-w-min translate-y-3 translate-x-2">
            in 3 guesses or less
          </span>
        </span>{' '}
        picks tomorrow's word.
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="w-40 h-12 py-2 px-4 bg-black text-white rounded-full border border-black"
          onClick={playGame}
        >
          Play
        </button>
        <button
          onClick={playGame} // hack - rules get shown anyways, just looks better with 3 buttons 🤫
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
        <div className="font-semibold text-sm">{formatDate(todaysGame.date)}</div>
        <div className="text-sm">No. {todaysGame.id}</div>
        <div className="text-sm">Edited by Ryan Tipps</div>
      </div>
    </div>
  );
}
