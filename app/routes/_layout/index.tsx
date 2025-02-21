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

const letters = 'abcdefghijklmnopqrstuvwxyz';
function Home() {
  // const router = useRouter();
  // const state = Route.useLoaderData();

  // menus
  const [started, setStarted] = useState(false);

  const {
    // game state
    guesses,
    currentRow,
    currentLetter,
    gameOver,
    setGuesses,
    setCurrentRow,
  } = useGameContext();

  const handleKeyPress = (e: KeyboardEvent) => {
    // ignore modifier keys
    if (e.metaKey || e.altKey || e.ctrlKey) {
      return;
    }

    // letters
    if (letters.includes(e.key)) {
      if (currentLetter < 5) {
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[currentRow][currentLetter] = e.key;
          return newGuesses;
        });
      }
    }

    // delete
    if (e.key === 'Backspace') {
      setGuesses((prev) => {
        const newGuesses = [...prev];
        newGuesses[currentRow][currentLetter - 1] = '';
        return newGuesses;
      });
    }

    // enter
    if (e.key === 'Enter') {
      if (currentLetter === 5) {
        setCurrentRow(currentRow + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentLetter]);

  if (!started) {
    return <Cover setStarted={setStarted} />;
  }

  if (gameOver) {
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
      {/* <div className="p-4 absolute right-0 top-0">
        <button onClick={() => setShowEnd(true)}>Show end</button>
      </div> */}
    </>
  );
}
