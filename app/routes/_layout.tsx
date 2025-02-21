import { Link, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

const Nav = () => (
  <nav className="text-base bg-neutral-900 border-b border-neutral-700">
    <div className="max-w-3xl mx-auto px-4 py-2 flex gap-2 items-center justify-center">
      <Brand />
    </div>
  </nav>
);

const Brand = () => <div className="font-bold text-lg tracking-tight select-none">Wordle War</div>;
