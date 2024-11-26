export const revalidate = 1;
export const dynamic = 'force-dynamic';

// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx
import { builder } from '@builder.io/sdk';
import { RenderBuilderContent } from '@components/builder';
import Image from 'next/image';

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    locale: string;
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const { locale, page } = props.params;

  const model = 'page';
  const content = await builder
    // Get the page content from Builder with the specified options
    .get('page', {
      userAttributes: {
        locale,
        // Use the page path specified in the URL to fetch the content
        urlPath: `/${locale}/` + (page?.join('/') || '')
      },
      options: {
        locale
      },
      // Set prerender to false to return JSON instead of HTML
      prerender: false
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      {content && content.data && content.data.backgroundMedia && (
        <div className="fixed inset-0 -z-10 w-full">
          <Image
            src={content.data.backgroundMedia}
            alt="Mountain landscape"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <RenderBuilderContent locale={locale} content={content} model={model} />
    </>
  );
}
