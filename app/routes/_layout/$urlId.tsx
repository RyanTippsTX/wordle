import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { getUrl } from '~/utils/urlStore';

export const Route = createFileRoute('/_layout/$urlId')({
  component: PageComponent,
  loader: async ({ params }) => {
    // const urlData = await getUrl({
    //   data: params.urlId,
    // });

    // if (urlData) {
    //   throw redirect({
    //     href: urlData.url,
    //   });
    // }
    return null;
  },
});

function PageComponent() {
  const state = Route.useLoaderData();

  return (
    <div className="py-8 text-center">
      <div className="font-semibold text-2xl">Expired or invalid link!</div>
      <div className="underline font-mediumx">{window.location.href}</div>
    </div>
  );
}
