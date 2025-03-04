import { createServerFn } from '@tanstack/start';

export type Game = {
  id: number; // e.g.  Tippsle #108
  date: string; // YYYY-MM-DD
  solution: string;
  chosenBy: string | null;
};

export const getTodaysGame = createServerFn({ method: 'GET' })
  // .validator((id: string) => id)
  .handler(async ({ data }) => {
    // TODO: get from database
    const id = 10;
    // const date = new Intl.DateTimeFormat('en-CA', {
    //   timeZone: 'America/Chicago', // Central Time (CST/CDT)
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    // }).format(new Date());
    const date = '2025-03-04';
    const solution = 'natal';
    const chosenBy = 'Ashley W.';

    // fake await 100ms
    await new Promise((resolve) => setTimeout(resolve, 100));

    const todaysGame: Game = {
      id,
      date,
      solution,
      chosenBy,
    };

    return todaysGame;
  });

export const saveGameState = createServerFn({ method: 'POST' })
  .validator((data: { url: string; ttl: number }) => data)
  .handler(async ({ data }) => {
    console.log('🔥 ', data);
  });
