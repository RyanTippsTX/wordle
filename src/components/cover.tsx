import { useGameContext } from '~/context/GameContext';
import { WordleIcon } from './wordle-icon';
import toast from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import { Route } from '~/routes/_layout/index';
import { formatDate } from '~/utils/dates';
import { isMobile } from '~/utils/useShareMessage';

export function Cover() {
  const todaysGame = Route.useLoaderData();
  const { setShowCover, guesses, setShowRules } = useGameContext();
  const [isSharing, setIsSharing] = useState(false);

  // Check if early access is enabled
  const hasEarlyAccess = useCallback(() => {
    return localStorage.getItem('early_access') === 'true';
  }, []);

  const handleShare = () => {
    if (!hasEarlyAccess()) return;

    setIsSharing(true);

    const shareMessage = `${window.location.href}\nCheck out this Wordle game!`;

    // Use Web Share API on mobile
    if (navigator.share && isMobile()) {
      navigator
        .share({ text: shareMessage })
        .then(() => {
          // toast.success('Shared successfully!');
        })
        .catch((error) => {
          // If user cancels share, don't show error
          if (error.name !== 'AbortError') {
            toast.error('Failed to share');
          }
        })
        .finally(() => {
          setTimeout(() => {
            setIsSharing(false);
          }, 300);
        });
    } else {
      // Fallback to clipboard for Desktop or if Web Share API is not available
      navigator.clipboard
        .writeText(shareMessage)
        .then(() => {
          toast.success('Copied to clipboard!', { duration: 2000 });
        })
        .catch(() => {
          toast.error('Failed to copy link');
        })
        .finally(() => {
          setTimeout(() => {
            setIsSharing(false);
          }, 300);
        });
    }
  };

  const playGame = useCallback(() => {
    if (!hasEarlyAccess()) return;
    setShowCover(false);
    if (!guesses.length) setShowRules(true);
  }, [setShowCover, setShowRules, guesses]);

  const showRulesThenPlay = useCallback(() => {
    if (!hasEarlyAccess()) return;
    setShowCover(false);
    setShowRules(true);
  }, [setShowRules, setShowCover]);

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
      <div className="mb-4 h-14 sm:h-16 aspect-square flex items-center justify-center">
        <WordleIcon />
      </div>

      <div className="text-4xl sm:text-[2.75rem] font-bold mb-3 font-patua tracking-tight text-center">
        Tippsle
      </div>
      <div className="text-xl sm:text-2xl font-light text-center mb-8 mx-4 max-w-xl">
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
          {guesses.length ? 'Continue' : 'Play'}
        </button>
        <button
          onClick={showRulesThenPlay}
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
        <div className="text-sm">No. {todaysGame.gameId}</div>
        <div className="text-sm">Edited by Ryan Tipps</div>
      </div>
    </div>
  );
}
