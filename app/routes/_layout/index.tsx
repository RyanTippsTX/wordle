import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Board } from '~/components/board';
import { Cover } from '~/components/cover';
import { End } from '~/components/end';
import { Keyboard } from '~/components/keyboard';
import { GameProvider, useGameContext } from '~/context/GameContext';
// import { createUrl } from '~/utils/urlStore';

// defines the page content at the given route
export const Route = createFileRoute('/_layout/')({
  component: Home,
  // loader: async () => await getCount(), // equivalent of getSSProps
});

function Home() {
  // const router = useRouter();
  // const state = Route.useLoaderData();

  const {
    started,
    setStarted,
    guesses,
    currentRow,
    currentLetter,
    gameOver,
    showEnd,
    setGuesses,
    setCurrentRow,
    handleKeyPress,
  } = useGameContext();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!started) {
    return <Cover />;
  }

  if (gameOver && showEnd) {
    return <End />;
  }

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
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

const Nav = () => (
  <nav className="w-full text-base bg-neutral-900 border-b border-neutral-700">
    <div className="max-w-3xl mx-auto px-4 py-2 flex gap-2 items-center justify-center">
      <Brand />
    </div>
  </nav>
);

const Brand = () => (
  <div className="font-bold text-xl m-0.5 tracking-tight select-none font-patua">Wordle War</div>
);
