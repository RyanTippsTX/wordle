import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { db, gamesTable } from './schema';

async function main() {
  const game: typeof gamesTable.$inferInsert = {
    date: '2024-11-16',
    solution: 'house',
    chosenBy: 'Alex T.',
  };

  await db.insert(gamesTable).values(game);
  console.log('New game created!');

  const games = await db.select().from(gamesTable);
  console.log('Getting all games from the database: ', games);
  /*
  const games: {
    id: number;
    date: string;
    solution: string;
    chosenBy: string;
  }[]
  */

  await db
    .update(gamesTable)
    .set({
      solution: 'trees',
    })
    .where(eq(gamesTable.date, '2024-11-16'));
  console.log('Game info updated!');

  // await db.delete(gamesTable).where(eq(gamesTable.date, '2024-11-16'));
  // console.log('Game deleted!');
}

main();
