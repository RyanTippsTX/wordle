import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { Board } from '~/components/board';
import { Cover } from '~/components/cover';
import { End } from '~/components/end';
import { Keyboard } from '~/components/keyboard';
// import { createUrl } from '~/utils/urlStore';

// defines the page content at the given route
export const Route = createFileRoute('/_layout/')({
  component: Home,
  // loader: async () => await getCount(), // equivalent of getSSProps
});

const defaultFormState = { url: '', ttl: 60 };

function Home() {
  // const router = useRouter();
  // const state = Route.useLoaderData();

  const [started, setStarted] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  if (!started) {
    return <Cover setStarted={setStarted} />;
  }

  if (showEnd) {
    return <End />;
  }

  return (
    <div>
      <Board />
      <Keyboard />
    </div>
  );
}
