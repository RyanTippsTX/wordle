import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Board } from '~/components/board';
import { Cover } from '~/components/cover';
import { End } from '~/components/end';
import { Keyboard } from '~/components/keyboard';
// import { createUrl } from '~/utils/urlStore';

// defines the page content at the given route
export const Route = createFileRoute('/_layout/')({
  component: Home,
  // loader: async () => await getCount(), // equivalent of getSSProps
});

const newGameState = [[], [], [], [], [], []];

function Home() {
  // const router = useRouter();
  // const state = Route.useLoaderData();

  // menus
  const [started, setStarted] = useState(false);
  // const [showEnd, setShowEnd] = useState(false);

  // game state
  const solution = 'hello'; // temp
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const [guesses, setGuesses] = useState<string[][]>(newGameState);
  console.log('🔥 guesses', guesses);
  const [currentRow, setCurrentRow] = useState(0);
  const currentLetter = guesses[currentRow]?.length;
  const gameOver = currentRow === 6;

  const handleKeyPress = (e: KeyboardEvent) => {
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

  const handleEnter = () => {
    if (currentLetter === 5) {
      setGuesses(guesses.map((row, i) => (i === currentRow ? [] : row)));
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
    <div>
      <div className="absolute top-12 left-0 text-xs">
        <pre>{JSON.stringify(guesses, null, 2)}</pre>
      </div>
      <Board />
      <Keyboard />
      {/* <div className="p-4 absolute right-0 top-0">
        <button onClick={() => setShowEnd(true)}>Show end</button>
      </div> */}
    </div>
  );
}
