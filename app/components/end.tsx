import { useCallback, useEffect, useState } from 'react';
import { WordleIcon } from './wordle-icon';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
import { useGameContext } from '~/context/GameContext';
import toast from 'react-hot-toast';
import { isMobile, useShareMessage } from '~/utils/useShareMessage';

export function End() {
  const { setShowEnd, guesses } = useGameContext();
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleSpin = useCallback(() => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 400);
  }, []);

  const shareMessage = useShareMessage();

  const handleShare = useCallback(() => {
    if (isSpinning || isSharing) return;
    handleSpin();
    setIsSharing(true);

    // Try to use Web Share API if available
    if (navigator.share && isMobile()) {
      navigator
        .share({ text: shareMessage })
        .then(() => {
          toast.success('Shared successfully!');
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
      // Fallback to clipboard if Web Share API is not available
      navigator.clipboard
        .writeText(shareMessage)
        .then(() => {
          toast.success('Results copied to clipboard!');
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
  }, [isSpinning, isSharing, handleSpin, shareMessage]);

  const handleClose = useCallback(() => {
    setShowEnd(false);
  }, [setShowEnd]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // enter to share
      if (e.key === 'Enter') {
        handleShare();
      }
      // esc to close
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleShare, handleClose]);

  return (
    <div className="absolute inset-0 text-gray-100 flex flex-col items-center justify-center bg-neutral-900 z-40">
      <div className="absolute top-3 right-3 p-3 cursor-pointer" onClick={handleClose}>
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
        onClick={handleShare}
        disabled={isSpinning}
      >
        Share
      </button>
    </div>
  );
}
