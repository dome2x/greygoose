import { Button } from '@components/ui/button';
import { getCollectionProducts } from '@lib/bigcommerce';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import GridItemTile from './tile';

export default function ProductCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const { locale } = params;

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320; // Adjust this value based on your card width + gap
      const newPosition =
        direction === 'left'
          ? Math.max(scrollPosition - scrollAmount, 0)
          : Math.min(
              scrollPosition + scrollAmount,
              carouselRef.current.scrollWidth - carouselRef.current.clientWidth
            );

      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setScrollPosition(carouselRef.current.scrollLeft);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const products = useQuery<any[]>({
    queryKey: ['products'],
    queryFn: () => {
      const res = getCollectionProducts({ collection: 'hidden-homepage-featured-items' });
      return res;
    }
  });

  return (
    <>
      <div className="relative w-screen overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-hidden px-4 py-8"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.data &&
            products.data.map(
              (product: {
                id: number;
                title: string;
                handle: string;
                availableForSale: boolean;
                featuredImage: { url: string };
                description: string;
              }) => (
                <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
                  <GridItemTile
                    data={{
                      id: product.id,
                      name: product.title,
                      subtitle: product.description,
                      size: '50 | 2.1cm',
                      length: '5" | 12.7cm',
                      duration: '40-60min',
                      intensity: 4,
                      format: 'ROBUSTO',
                      availableForSale: product.availableForSale,
                      href: `/${locale}/product/${product.handle}`,
                      featuredImage: {
                        url: product.featuredImage.url
                      }
                    }}
                  />
                </div>
              )
            )}
        </div>
        <Button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-gray-200"
          onClick={() => scroll('left')}
          disabled={scrollPosition === 0}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-gray-200"
          onClick={() => scroll('right')}
          disabled={
            carouselRef.current
              ? scrollPosition >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth
              : undefined
          }
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </>
  );
}
