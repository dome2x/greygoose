import QueryProvider from '@components/query-provider';
import { routing } from '@i18n/routing';
import { ensureStartsWith } from '@lib/utils';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};
//👇 Import Open Sans font
import { Alegreya } from 'next/font/google';

//👇 Configure our font object
const openSans = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});
// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter'
// });

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang="en" className={openSans.variable}>
      <body
        className={
          'bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 ' +
          'container mx-auto max-w-6xl items-center dark:text-white dark:selection:bg-pink-500 dark:selection:text-white'
        }
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <Suspense>
              <main>{children}</main>
            </Suspense>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
