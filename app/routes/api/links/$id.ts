import { json } from '@tanstack/start';
import { createAPIFileRoute } from '@tanstack/start/api';

export const APIRoute = createAPIFileRoute('/api/links/$id')({
  GET: ({ request, params }) => {
    return json({ message: 'Here is your link', id: params.id, url: 'https://www.x.com' });
  },
});
