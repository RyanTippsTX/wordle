import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameState {
  guesses: string[][];
  currentRow: number;
  currentLetter: number;
  gameOver: boolean;
  setGuesses: React.Dispatch<React.SetStateAction<string[][]>>;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
}

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const defaultGuesses = [[], [], [], [], [], []];
  const [guesses, setGuesses] = useState<string[][]>(defaultGuesses);
  const [currentRow, setCurrentRow] = useState(0);
  const currentLetter = guesses[currentRow]?.length;
  const gameOver = currentRow === 6;

  return (
    <GameContext.Provider
      value={{ guesses, currentRow, currentLetter, gameOver, setGuesses, setCurrentRow }}
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
