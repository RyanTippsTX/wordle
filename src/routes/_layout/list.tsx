import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
// import { getUrls } from '~/utils/urlStore';

export const Route = createFileRoute('/_layout/list')({
  component: PageComponent,
  loader: async () => {
    // return await getUrls();
  },
});

function PageComponent() {
  const router = useRouter();
  const state = Route.useLoaderData();

  const [host, setHost] = useState<string>(''); //
  useEffect(() => {
    setHost(window?.location?.origin);
  }, []);

  return (
    <div>
      <div>stuff</div>
    </div>
  );
}
