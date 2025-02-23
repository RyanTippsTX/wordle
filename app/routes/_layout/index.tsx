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
    <>
      <div className="absolute top-12 left-0 text-xs">
        <pre>{JSON.stringify(guesses, null, 2)}</pre>
      </div>
      <div className="pt-2">
        <Board />
      </div>
      <div className="pt-2">
        <Keyboard />
      </div>
    </>
  );
}
