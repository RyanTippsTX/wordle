// app/routes/__root.tsx
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import appCss from '~/styles/app.css?url';
import type { ReactNode } from 'react';

const faviconEmoji = [
  //
  // '🌎',
  '🍎',
  // '🤓',
  // '🧐',
  // '🐛',
  // '🧃',
][0];

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Wordle War',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Patua+One&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },

      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox="0 0 100 100"><text y="1em" font-size="80">${faviconEmoji}</text></svg>`,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
