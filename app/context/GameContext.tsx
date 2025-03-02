import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { isValidWord } from '~/utils/wordValidation';
import toast from 'react-hot-toast';

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
  isShaking: boolean;
}

const GameContext = createContext<GameState | undefined>(undefined);

const letters = 'abcdefghijklmnopqrstuvwxyz';

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const wordle = 'hello';
  const [started, setStarted] = useState(false);
  const defaultGuesses = [[], [], [], [], [], []];
  const [guesses, setGuesses] = useState<string[][]>(defaultGuesses);
  const [currentRow, setCurrentRow] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const currentLetter = guesses[currentRow]?.length;
  const [showEnd, setShowEnd] = useState(false);
  const pastGuesses = currentRow > 0 ? guesses.slice(0, currentRow) : [];
  const guessedLetters = new Set(pastGuesses.flat());

  const didGuessWordle = pastGuesses.slice(-1)[0]?.join('') === wordle;
  const gameOver = currentRow === 6 || didGuessWordle;

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setShowEnd(true);
      }, 1250);
    }
  }, [gameOver]);

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
        } else return; // should not happen
      }

      // enter
      if (e.key === 'Enter') {
        if (currentLetter === 5) {
          // check if word is valid
          const currentGuess = guesses[currentRow].join('');
          if (isValidWord(currentGuess)) {
            setCurrentRow(currentRow + 1);
          } else {
            toast.error('Not in word list');

            // Trigger shake animation
            setIsShaking(true);
            setTimeout(() => {
              setIsShaking(false);
            }, 300);
          }
        } else if (currentLetter < 5) {
          toast.error('Not enough letters');
          // Trigger shake animation
          setIsShaking(true);
          setTimeout(() => {
            setIsShaking(false);
          }, 300);
        } else return; // should not happen
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
    [currentLetter, currentRow, setGuesses, setCurrentRow, started, gameOver, guesses],
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
        isShaking,
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
