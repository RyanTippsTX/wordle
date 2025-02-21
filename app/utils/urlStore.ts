import { createServerFn } from '@tanstack/start';

export const getUrl = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    console.log('🔥 data');
  });

export const createUrl = createServerFn({ method: 'POST' })
  .validator((data: { url: string; ttl: number }) => data)
  .handler(async ({ data }) => {
    console.log('🔥 ', data);
  });
