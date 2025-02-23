import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface GameState {
  wordle: string;
  started: boolean;
  setStarted: (started: boolean) => void;
  guesses: string[][];
  currentRow: number;
  currentLetter: number;
  gameOver: boolean;
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

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      console.log('🔥 e', e);
      console.log('🔥 started', started);
      // ignore until game starts
      if (!started) {
        return;
      }

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
    },
    [currentLetter, currentRow, setGuesses, setCurrentRow, started],
  );

  return (
    <GameContext.Provider
      value={{
        wordle,
        started,
        setStarted,
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
