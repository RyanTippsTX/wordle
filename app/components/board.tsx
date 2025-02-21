import { twMerge } from 'tailwind-merge';
// import { atom, useAtom } from "jotai";

// const pastGuessesAtom = atom<string[]>([]);
// const currentGuessAtom = atom<string>("");
export function Board() {
  // TODO: lift state into context or jotai https://tutorial.jotai.org/quick-start/intro
  const solution = 'apple';
  // const [pastGuesses, setPastGuesses] = useAtom(pastGuessesAtom);
  // const [currentGuess, setCurrentGuess] = useState("");

  return (
    <div
      className="flex w-full flex-col 
        items-center justify-center
        space-y-1
        "
    >
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  );
}

const Row = ({ word }: { word?: string }) => {
  const letters = word?.split('') || '';
  return (
    <div className="flex gap-x-1">
      <Square letter={letters[0] || ''} />
      <Square letter="" />
      <Square letter="" />
      <Square letter="" />
      <Square letter="" />
    </div>
  );
};

const Square = ({ letter, state }: { letter: string; state?: 'yellow' | 'green' | 'gray' }) => {
  return (
    <div
      //
      className={twMerge(
        'flex h-12 w-12 items-center justify-center bg-gray-400 text-sm tracking-tighter text-white',
      )}
    >
      {letter}
    </div>
  );
};
