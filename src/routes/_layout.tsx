import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { GameProvider } from '~/context/GameContext';
import { Toaster } from 'react-hot-toast';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <GameProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
          style: {
            userSelect: 'none',
            background: '#333',
            color: '#fff',
            fontWeight: 'bold',
          },
        }}
      />
      <Outlet />
    </GameProvider>
  );
}
