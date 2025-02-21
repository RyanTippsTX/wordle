import { twMerge } from 'tailwind-merge';
import { useGameContext } from '~/context/GameContext';

export function Board() {
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
        'flex h-12 w-12 items-center justify-center text-sm tracking-tighter border-2 border-neutral-700',
      )}
    >
      {letter}
    </div>
  );
};
