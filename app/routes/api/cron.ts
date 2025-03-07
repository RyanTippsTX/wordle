import { json } from '@tanstack/start';
import { createAPIFileRoute } from '@tanstack/start/api';
import { getRandomWord } from '~/utils/wordValidation';

export const APIRoute = createAPIFileRoute('/api/cron')({
  GET: async ({ request }) => {
    const message = `Cron ran successfully at ${new Date().toISOString()}`;
    const randomWord = getRandomWord();
    console.log('🔥', message, randomWord);
    return json({ message, randomWord });
  },
});
