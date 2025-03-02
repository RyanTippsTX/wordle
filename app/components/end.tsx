import { useCallback, useEffect, useState } from 'react';
import { WordleIcon } from './wordle-icon';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
import { useGameContext } from '~/context/GameContext';

const shareMessage = `Tippsle 1,234 3/6
Cameron's word

🟨⬛⬛⬛🟨
🟩🟩🟩⬛⬛
🟩🟩🟩🟩🟩`;

export function End() {
  const { setShowEnd } = useGameContext();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = useCallback(() => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 400);
  }, []);

  const handleShare = useCallback(() => {
    if (isSpinning) return;
    handleSpin();
    navigator.clipboard.writeText(shareMessage);
  }, [isSpinning, handleSpin]);

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
