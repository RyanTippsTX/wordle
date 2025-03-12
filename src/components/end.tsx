import { useCallback, useEffect, useState } from 'react';
import { WordleIcon } from './wordle-icon';
import { twMerge } from 'tailwind-merge';
// import { X } from 'lucide-react';
import { useGameContext } from '~/context/GameContext';
import toast from 'react-hot-toast';
import { isMobile, useShareMessage } from '~/utils/useShareMessage';

export function End() {
  const { setShowEnd, guesses, promptForTomorrowsWord } = useGameContext();
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
    } else if (navigator.clipboard) {
      // Fallback to clipboard for Desktop or if Web Share API is not available
      navigator.clipboard
        .writeText(shareMessage)
        .then(() => {
          toast.success('Results copied to clipboard!', { duration: 2000 });
        })
        .catch(() => {
          toast.error('Failed to copy link');
        })
        .finally(() => {
          setTimeout(() => {
            setIsSharing(false);
          }, 300);
        });
    } else {
      toast.error('Failed to share');
      setIsSharing(false);
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
        {/* <X /> */}
        <div className="text-2xl bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center">
          X
        </div>
      </div>
      <div
        className={twMerge(
          'mb-3 w-16 h-16 flex items-center justify-center',
          isSpinning && 'animate-rapid-spin',
        )}
      >
        <WordleIcon />
      </div>

      {/* {promptForTomorrowsWord.isSuccess && promptForTomorrowsWord.data ? ( */}
      {/* eslint-disable-next-line no-constant-condition */}
      {true ? (
        // Prompt for tomorrow's word
        <>
          <div className="text-4xl font-extrabold mb-3 text-center">You're the first winner!!</div>
          <div className="text-2xl font-light text-center mb-8">Choose tomorrow's word?</div>

          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const word = formData.get('word') as string;
              console.log('🔥 word', word);
            }}
          >
            <input
              type="text"
              name="word"
              placeholder="Enter your word"
              className="block w-40 h-12 py-2 px-4 bg-gray-100 text-black rounded-full border border-black"
            />
            <button
              type="submit"
              className="block w-40 h-12 py-2 px-4 bg-gray-100 text-black rounded-full border border-black"
              // disabled={isSpinning}
            >
              Pick word
            </button>
          </form>
        </>
      ) : (
        // Thanks / Share
        <>
          <div className="text-4xl font-extrabold mb-3 text-center">Thanks for playing today!</div>
          <div className="text-2xl font-light text-center mb-8">See you tomorrow?</div>
          <button
            className="w-40 h-12 py-2 px-4 bg-gray-100 text-black rounded-full border border-black"
            onClick={handleShare}
            disabled={isSpinning}
          >
            Share
          </button>
        </>
      )}
    </div>
  );
}
