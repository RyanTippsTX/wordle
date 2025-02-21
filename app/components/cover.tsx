export function Cover({ setStarted }: { setStarted: (started: boolean) => void }) {
  return (
    <div className="text-black flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Logo placeholder */}
      <div className="w-12 h-12 mb-4 bg-gray-200 border border-gray-300 rounded"></div>

      <div className="text-4xl font-bold mb-2">Wordle</div>
      <p className="text-center mb-8">Get 6 chances to guess a 5-letter word.</p>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        <button
          className="w-full py-2 px-4 bg-black text-white rounded"
          onClick={() => setStarted(true)}
        >
          Play
        </button>
        <button className="w-full py-2 px-4 bg-gray-200 text-black rounded">Log in</button>
        <button className="w-full py-2 px-4 bg-gray-200 text-black rounded">Subscribe</button>
      </div>

      <div className="mt-8 text-center">
        <div>
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        <div className="text-sm text-gray-600">No. 1</div>
        <div className="text-sm text-gray-600">Edited by Ryan Tipps</div>
      </div>
    </div>
  );
}
