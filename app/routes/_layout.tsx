import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { GameProvider } from '~/context/GameContext';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <GameProvider>
      <Outlet />
    </GameProvider>
  );
}
