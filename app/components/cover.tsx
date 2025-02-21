import { WordleIcon } from './wordle-icon';

export function Cover({ setStarted }: { setStarted: (started: boolean) => void }) {
  return (
    <div className="absolute inset-0 text-black flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-3 w-16 h-16 flex items-center justify-center">
        <WordleIcon />
      </div>

      <div className="text-4xl font-extrabold mb-3">Wordle</div>
      <div className="text-2xl font-light text-center mb-8">
        Get 6 chances to guess a 5-letter word.
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="w-40 h-12 py-2 px-4 bg-black text-white rounded-full border border-black"
          onClick={() => setStarted(true)}
        >
          Play
        </button>
        <button className="w-40 h-12 py-2 px-4 text-black rounded-full border border-black">
          Log in
        </button>
        <button className="w-40 h-12  py-2 px-4 text-black rounded-full border border-black">
          Subscribe
        </button>
      </div>

      <div className="mt-8 text-center">
        <div className="font-semibold text-sm">
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        <div className="text-sm">No. 1</div>
        <div className="text-sm">Edited by Ryan Tipps</div>
      </div>
    </div>
  );
}
