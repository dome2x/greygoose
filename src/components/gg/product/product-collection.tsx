import { Button } from "@components/ui/button";
import { getProduct } from "@lib/bigcommerce";
import { VercelProduct } from "@lib/bigcommerce/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GridItemTile from "../grid/tile";

const ProductCollection = ({ collection }: {collection: number[]}) => {
  const [products, setProducts] = useState([] as VercelProduct[]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const { locale } = params;

  useEffect(() => {
    console.log("Collection", collection);
    const prodList = collection.map(async (prodId) => {
      const prod = await getProduct(prodId)
      return prod;
    });
    Promise.all(prodList).then((res) => {
      console.log("ProductCollection", res);
      setProducts(res.filter((prod) => prod !== undefined) as VercelProduct[]);  
    });
  }, [collection]);

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

  return (
    <>
          <div className="relative w-screen overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-hidden px-4 py-8"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products &&
            products.map(
              (product) => (
                <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
                  <GridItemTile
                    data={{
                      id: parseInt(product.id),
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

export default ProductCollection;