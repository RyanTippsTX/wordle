import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface GameState {
  wordle: string;
  guessedLetters: Set<string>;
  started: boolean;
  setStarted: (started: boolean) => void;
  pastGuesses: string[][];
  guesses: string[][];
  currentRow: number;
  currentLetter: number;
  gameOver: boolean;
  showEnd: boolean;
  setShowEnd: (showEnd: boolean) => void;
  setGuesses: React.Dispatch<React.SetStateAction<string[][]>>;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
  handleKeyPress: (e: KeyboardEvent) => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

const letters = 'abcdefghijklmnopqrstuvwxyz';

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const wordle = 'hello';
  const [started, setStarted] = useState(false);
  const defaultGuesses = [[], [], [], [], [], []];
  const [guesses, setGuesses] = useState<string[][]>(defaultGuesses);
  const [currentRow, setCurrentRow] = useState(0);
  const currentLetter = guesses[currentRow]?.length;
  const gameOver = currentRow === 6;
  const [showEnd, setShowEnd] = useState(true);
  const pastGuesses = currentRow > 0 ? guesses.slice(0, currentRow) : [];
  const guessedLetters = new Set(pastGuesses.flat());

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      // ignore until game starts
      if (!started) {
        return;
      }

      // ignore after game over
      if (gameOver) {
        return;
      }

      // ignore modifier keys
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      // letters
      if (letters.includes(e.key.toLowerCase())) {
        if (currentLetter < 5) {
          setGuesses((prev) => {
            const newGuesses = [...prev];
            newGuesses[currentRow][currentLetter] = e.key.toLowerCase();
            return newGuesses;
          });
        }
      }

      // enter
      if (e.key === 'Enter') {
        if (currentLetter === 5) {
          setCurrentRow(currentRow + 1);
        }
      }

      // delete
      if (e.key === 'Backspace') {
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[currentRow] = newGuesses[currentRow].slice(0, -1);
          return newGuesses;
        });
      }
    },
    [currentLetter, currentRow, setGuesses, setCurrentRow, started],
  );

  return (
    <GameContext.Provider
      value={{
        wordle,
        guessedLetters,
        started,
        setStarted,
        showEnd,
        setShowEnd,
        pastGuesses,
        guesses,
        currentRow,
        currentLetter,
        gameOver,
        setGuesses,
        setCurrentRow,
        handleKeyPress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
