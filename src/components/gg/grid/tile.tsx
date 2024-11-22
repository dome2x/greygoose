'use client';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type ProductData = {
  id: number;
  name: string;
  subtitle: string;
  size: string;
  length: string;
  duration: string;
  intensity: number;
  format: string;
  availableForSale: boolean;
  href: string;
  featuredImage: {
    url: string;
  };
};

export default function GridItemTile({ data }: { data: ProductData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={data.href} className="w-[300px]">
      <Card
        className="w-[300px] transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="relative">
            {data.availableForSale && (
              <span className="absolute right-2 top-2 bg-[#F5F1E4] px-2 py-1 text-xs font-semibold">
                AVAILABLE
              </span>
            )}
            <Image
              src={data.featuredImage.url}
              alt={data.name}
              className="object-cover"
              width={300}
              height={300}
            />
          </div>
          <div className="p-4">
            <div className="text-center">
              <p className="text-sm uppercase text-muted-foreground">GREY GOOSE</p>
              <h3 className="mt-2 text-lg font-semibold leading-tight">
                {data.name}
                <br />
                <br />
                <span className="text-sm">{data.subtitle}</span>
              </h3>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span>{data.size}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{data.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{data.duration}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span>INTENSITY</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i <= data.intensity ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <span>FORMAT {data.format}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div
            className={`w-full transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <Button className="w-full bg-[#C69C6D] hover:bg-[#B38B5C]">SHOP NOW</Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
