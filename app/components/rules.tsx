import { useGameContext } from '~/context/GameContext';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useCallback, useEffect, useState } from 'react';

export function Rules() {
  const { setShowRules } = useGameContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setShowRules(false);
    }, 300);
  }, [setShowRules]);

  useEffect(() => {
    // Add keyboard event listener for Enter and Escape keys
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with fade effect */}
      <div
        className={twMerge(
          'absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
        onClick={handleClose}
      />

      {/* Modal content with slide-up and fade effect */}
      <div
        className={twMerge(
          'relative w-full max-h-full max-w-xl mx-auto transition-all duration-300 transform',
          'sm:rounded-xl overflow-y-auto sm:max-h-[90vh]',
          'bg-neutral-900 text-gray-100 p-6 md:p-8 border border-neutral-800',
          'flex flex-col',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}
      >
        <div
          className="absolute top-3 right-3 p-3 cursor-pointer hover:bg-neutral-800 rounded-full transition-colors"
          onClick={handleClose}
        >
          <X />
        </div>

        {/* <div className="flex justify-center mb-6">
          <WordleIcon />
        </div> */}

        <div className="text-3xl font-extrabold mb-0 tracking-tight mt-4 font-patua">
          How to play
        </div>
        <div className="text-xl font-light mb-3 tracking-tight">Guess the word in 6 tries</div>

        <div className="space-y-6">
          <div>
            <ul className="list-disc pl-5 space-y-2 tracking-tight font-light">
              <li>Each guess must be a valid 5-letter word</li>
              <li>The color of the tiles will change to show how close your guess was</li>
              <li>You have 6 attempts to guess the word correctly</li>
            </ul>
          </div>

          <div>
            <p className="mb-2 font-medium">Examples:</p>
            <div className="mb-4">
              <div className="flex gap-1 mb-1">
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-green-600 font-bold text-white">
                  W
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  E
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  A
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  R
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  Y
                </div>
              </div>
              <p className="text-sm">The letter W is in the word and in the correct spot.</p>
            </div>

            <div className="mb-4">
              <div className="flex gap-1 mb-1">
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  P
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-yellow-500 font-bold text-white">
                  I
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  L
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  L
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  S
                </div>
              </div>
              <p className="text-sm">The letter I is in the word but in the wrong spot.</p>
            </div>

            <div className="mb-4">
              <div className="flex gap-1 mb-1">
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  V
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  A
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  G
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-neutral-700 font-bold text-white">
                  U
                </div>
                <div className="w-10 h-10 text-lg flex items-center justify-center bg-transparent border-2 border-neutral-700 font-bold text-white">
                  E
                </div>
              </div>
              <p className="text-sm">The letter U is not in the word in any spot.</p>
            </div>
          </div>

          <div className="p-4 bg-neutral-800 rounded-lg">
            <p className="font-medium text-yellow-400">✨ Special Rule</p>
            <p>
              The first player to correctly guess the word in 3 tried or less gets to pick
              tomorrow's word!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
