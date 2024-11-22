import type { Metadata } from 'next';

import Prose from '@components/prose';
import { getPage } from '@lib/bigcommerce';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 1; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
    </>
  );
}


// import { builder } from "@builder.io/sdk";
// import { RenderBuilderContent } from "@components/builder";

// // Builder Public API Key set in .env file
// builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// interface PageProps {
//   params: {
//     page: string[];
//   };
// }

// export default async function Page(props: PageProps) {
//   const builderModelName = "page";

//   const content = await builder
//     // Get the page content from Builder with the specified options
//     .get(builderModelName, {
//       userAttributes: {
//         // Use the page path specified in the URL to fetch the content
//         urlPath: "/" + (props?.params?.page || ""),
//       },
//     })
//     // Convert the result to a promise
//     .toPromise();

//   return (
//     <>
//       {/* Render the Builder page */}
//       <RenderBuilderContent content={content} model={builderModelName} />
//     </>
//   );
// }
