import Carousel from '@components/gg/carousel/index';
import Hero from '@components/gg/hero';
import Footer from '@components/layout/footer';
import Link from 'next/link';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and BigCommerce.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
    <Link href="/en-GB/bio/home">Home</Link>
      <Hero />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
