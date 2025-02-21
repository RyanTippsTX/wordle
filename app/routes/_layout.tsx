import { Link, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <Nav />
      <div className="max-w-3xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

const Nav = () => (
  <nav className="text-base bg-amber-600">
    <div className="max-w-3xl mx-auto px-4 py-2 flex gap-2 justify-between">
      <Link tabIndex={-1} to="/" className="my-auto">
        <Brand />
      </Link>
      <Link tabIndex={-1} to="/list" className="my-auto hover:underline">
        List
      </Link>
    </div>
  </nav>
);

const Brand = () => <div className="font-bold text-lg tracking-tight select-none">Wordle</div>;
