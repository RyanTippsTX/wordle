import { json } from '@tanstack/start';
import { createAPIFileRoute } from '@tanstack/start/api';
// import { addWordsToDb, getRandomWord, getRandomWordFromDb } from '~/utils/word';

export const APIRoute = createAPIFileRoute('/api/cron')({
  GET: async ({ request }) => {
    // get 3 random words from word list
    // const newWords = [getRandomWord(), getRandomWord(), getRandomWord()];

    // add them to DB word list
    // const result = await addWordsToDb(newWords);

    // const chosenWord = await getRandomWordFromDb();

    const message = `Cron ran successfully at ${new Date().toISOString()}`;
    // console.log('🔥', message, newWords);
    return json({
      //
      message,
      // result,
      // newWords,
    });
  },
});
