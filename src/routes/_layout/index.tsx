import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Board } from '~/components/board';
import { Cover } from '~/components/cover';
import { End } from '~/components/end';
import { Keyboard } from '~/components/keyboard';
import { Rules } from '~/components/rules';
import { useGameContext } from '~/context/GameContext';
// import { HelpCircle } from 'lucide-react';
import { getTodaysGame } from '~/utils/game';

// defines the page content at the given route
export const Route = createFileRoute('/_layout/')({
  component: Home,
  loader: async () => await getTodaysGame(), // equivalent of getSSProps
});

function Home() {
  // const router = useRouter();
  const todaysGame = Route.useLoaderData();
  // console.log('🔥 ', todaysGame);

  const {
    showCover,
    setShowCover,
    guesses,
    currentRow,
    currentLetter,
    gameOver,
    showEnd,
    showRules,
    setGuesses,
    handleKeyPress,
    setShowRules,
    chosenBy,
  } = useGameContext();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  if (showCover && !gameOver) {
    return <Cover />;
  }

  if (gameOver && showEnd) {
    return <End />;
  }

  return (
    <div className="flex flex-col items-center justify-between h-full w-full max-h-[48rem]">
      {showRules && <Rules />}
      {/* <div className="absolute top-12 left-0 text-xs">
        <pre>{JSON.stringify(guesses, null, 2)}</pre>
      </div> */}
      <Nav />
      <div className="pt-2 flex-1">
        <Board />
      </div>
      <div className="p-2 w-full">
        <Keyboard />
      </div>
    </div>
  );
}

const Nav = () => {
  const { setShowRules } = useGameContext();

  return (
    <nav className="w-full text-base bg-neutral-900 border-b border-neutral-700">
      <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between">
        <Brand />
        <button
          tabIndex={-1}
          onClick={() => setShowRules(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          className="p-2 text-gray-300 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
          aria-label="Help"
        >
          {/* <HelpCircle size={20} /> */}
          <div className="text-2xl bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center">
            ?
          </div>
        </button>
      </div>
    </nav>
  );
};

const Brand = () => (
  <div className="font-bold text-xl m-0.5 tracking-tight select-none font-patua">Tippsle</div>
);
