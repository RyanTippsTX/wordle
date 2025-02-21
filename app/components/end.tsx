import { WordleIcon } from './wordle-icon';

const shareMessage = `Wordle 1,342 3/6

🟨⬛⬛⬛🟨
🟩🟩🟩⬛⬛
🟩🟩🟩🟩🟩`;

export function End() {
  return (
    <div className="absolute inset-0 text-gray-100 flex flex-col items-center justify-center bg-neutral-900">
      <div className="mb-3 w-16 h-16 flex items-center justify-center">
        <WordleIcon />
      </div>

      <div className="text-4xl font-extrabold mb-3">Thanks for playing today!</div>
      <div className="text-2xl font-light text-center mb-8">See you tomorrow?</div>

      <button
        className="w-40 h-12 py-2 px-4 bg-gray-100 text-black rounded-full border border-black"
        onClick={() => {
          navigator.clipboard.writeText(shareMessage);
        }}
      >
        Share
      </button>
    </div>
  );
}
