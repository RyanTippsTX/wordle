import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { isValidWord } from '~/utils/wordsValid';
import toast from 'react-hot-toast';
import { Route } from '~/routes/_layout/index';
import { trackGuess } from '~/utils/game';
interface GameState {
  solution: string;
  chosenBy: string | null;
  guessedLetters: Set<string>;
  showCover: boolean;
  setShowCover: (showCover: boolean) => void;
  showRules: boolean;
  setShowRules: (showRules: boolean) => void;
  guesses: string[][];
  stagedGuess: string[];
  currentRow: number;
  currentLetter: number;
  gameOver: boolean;
  showEnd: boolean;
  setShowEnd: (showEnd: boolean) => void;
  setGuesses: React.Dispatch<React.SetStateAction<string[][]>>;
  handleKeyPress: (e: KeyboardEvent) => void;
  isShaking: boolean;
  isTouchDevice: boolean;
}

const GameContext = createContext<GameState | undefined>(undefined);

const letters = 'abcdefghijklmnopqrstuvwxyz';

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // constants - might break at midnight
  const todaysGame = Route.useLoaderData();

  const solution = todaysGame.solution;
  const chosenBy = todaysGame.chosenBy;

  // routing
  const [showCover, setShowCover] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  // ...derived
  const showGame = !showEnd && !showRules && !showCover;

  // game state
  const [guesses, setGuesses] = useState<string[][]>([]);
  const [stagedGuess, setStagedGuess] = useState<string[]>([]); // array of letters
  // ...derived
  const currentRow = guesses.length;
  const currentLetter = stagedGuess.length;
  const guessedLetters = new Set(guesses.flat());
  const didGuessSolution = !!guesses.length && guesses[guesses.length - 1].join('') === solution;
  const gameOver = didGuessSolution || guesses.length === 6;

  // misc helpers
  const [isShaking, setIsShaking] = useState(false);
  const [solutionToastId, setSolutionToastId] = useState<string | undefined>();

  // if todays game id changes, clear game state from React state
  // not sure if this will be needed, but it's a precaution.
  // WARNING: this effect must be before the backup/restore effects
  useEffect(() => {
    setGuesses([]);
  }, [todaysGame.gameId]);

  // restore game state from local storage
  useEffect(() => {
    const gameState = localStorage.getItem(`${todaysGame.gameId}`);
    if (gameState) {
      setGuesses(JSON.parse(gameState).guesses);
    }
  }, [todaysGame.gameId]);

  // on each guess, backup game state locally
  useEffect(() => {
    localStorage.setItem(
      `${todaysGame.gameId}`,
      JSON.stringify({
        guesses,
      }),
    );
  }, [guesses, todaysGame.gameId]);

  // save each guess to db
  useEffect(() => {
    if (guesses.length > 0) {
      trackGuess({
        data: {
          gameId: todaysGame.gameId,
          guessNumber: guesses.length,
          word: guesses[guesses.length - 1].join(''),
        },
      });
    }
  }, [guesses, todaysGame.gameId]);

  // Win toast
  useEffect(() => {
    if (gameOver && didGuessSolution) {
      toast.success('Great job!', { icon: '🎉', duration: 2000 });
    }
  }, [gameOver, didGuessSolution, solution]);

  // Perpetual lose toast
  useEffect(() => {
    if (gameOver && !didGuessSolution && showGame && !solutionToastId) {
      const id = toast.error(solution.toUpperCase(), { duration: Infinity, icon: '💀' });
      setSolutionToastId(id);
    }
  }, [gameOver, didGuessSolution, showGame, solutionToastId, solution]);

  // Temp dismiss lose toast when viewing other pages
  useEffect(() => {
    if (!showGame && solutionToastId) {
      toast.dismiss(solutionToastId);
      setSolutionToastId(undefined);
    }
  }, [showGame, solutionToastId]);

  // Show end screen after 2 seconds
  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setShowEnd(true);
      }, 2000);
    }
  }, [gameOver]);

  // Detect touch device on mount
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      // ignore until game starts
      if (showCover) {
        return;
      }

      // ignore while rules are shown
      if (showRules) {
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
          setStagedGuess((prev) => [...prev, e.key.toLowerCase()]);
        } else return; // should not happen
      }

      // enter
      if (e.key === 'Enter') {
        if (currentLetter === 5) {
          // check if word is valid
          if (isValidWord(stagedGuess.join(''))) {
            setGuesses((prev) => [...prev, stagedGuess]);
            setStagedGuess([]);
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
        setStagedGuess((prev) => prev.slice(0, -1)); // safe to do on empty array
      }
    },
    [currentLetter, setGuesses, stagedGuess, setStagedGuess, showCover, gameOver, showRules],
  );

  return (
    <GameContext.Provider
      value={{
        solution,
        chosenBy,
        guessedLetters,
        showCover,
        setShowCover,
        showRules,
        setShowRules,
        showEnd,
        setShowEnd,
        guesses,
        stagedGuess,
        currentRow,
        currentLetter,
        gameOver,
        setGuesses,
        handleKeyPress,
        isShaking,
        isTouchDevice,
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
