const title = 'Wordle War';
const description = "First winner picks tomorrow's word.";

export function Layout({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <>
      <div>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍎</text></svg>"
        />

        {/* OG Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:url" content="my-wordle-game.com" /> */}
        {/* <meta property="og:type" content="website" /> */}
      </div>

      <main className="flex min-h-screen flex-col items-center justify-start">
        <div className="flex min-h-screen flex-col items-center justify-start gap-y-8 pb-4 pt-8">
          {children}
        </div>
      </main>
    </>
  );
}
