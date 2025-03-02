import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { GameProvider } from '~/context/GameContext';
import { Toaster } from 'react-hot-toast';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <GameProvider>
      <Toaster />
      <Outlet />
    </GameProvider>
  );
}
