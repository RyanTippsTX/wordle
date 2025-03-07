// app/routes/__root.tsx
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
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
        title: 'Tippsle — A  5 Letter Word Game',
        //              ^this is an Em dash
      },
      {
        // disable zoom on mobile when clicking on text
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
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
        // crossOrigin: 'true',
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
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
