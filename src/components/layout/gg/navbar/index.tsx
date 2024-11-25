'use client';

import { ChevronDown, Globe, MapPin, Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { useLocale } from 'next-intl';

export default function Navbar() {
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-colors duration-300',
        isScrolled || activeDropdown ? 'bg-white shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container flex items-center">
        <div className="mr-8 flex-shrink-0 pl-12">
          <Link href={`/${locale}/gg/home`} className="block py-4">
            <Image
              src="/media/nav-desktop-logo-blue.svg"
              alt="Grey Goose"
              width={120}
              height={60}
              className="h-20 w-auto"
            />
          </Link>
        </div>
        <div className="flex flex-grow flex-col">
          <div className="flex justify-end py-2">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" aria-label="Find Location">
                <MapPin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Change Language">
                <Globe className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Log In">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <nav className="flex h-16 items-center justify-end">
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Button
                variant="ghost"
                className="text-sm font-medium uppercase tracking-wide"
                onClick={() => toggleDropdown('products')}
              >
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-medium uppercase tracking-wide"
                onClick={() => toggleDropdown('cocktails')}
              >
                Cocktails <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/explore" className="text-sm font-medium uppercase tracking-wide">
                  Explore
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/buy" className="text-sm font-medium uppercase tracking-wide">
                  Buy
                </Link>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" aria-label="Menu" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
      {activeDropdown && (
        <div className="absolute left-0 right-0 max-h-6 border-t border-gray-400 bg-white shadow-md">
          <div className="container items-center py-1">
            {activeDropdown === 'products' && (
              <div className="flex-cols flex justify-center gap-8">
                <span className="grow" />
                <Link href="/buy" className="mb-4 text-xs font-light hover:underline">
                  All Products
                </Link>
                <Link href="/buy" className="mb-4 text-xs font-light hover:underline">
                  GREY GOOSE® ALTIUS
                </Link>
                <Link href="/buy" className="mb-4 text-xs font-light hover:underline">
                  Flavoured Products
                </Link>
                <Link href="/buy" className="mb-4 text-xs font-light hover:underline">
                  Limited Edition
                </Link>
                <span className="grow" />
              </div>
            )}
            {activeDropdown === 'cocktails' && (
              <div className="flex-cols flex justify-center gap-8">
                <span className="grow" />
                <Link href="/buy" className="mb-4 text-xs font-light hover:underline">
                  All Cocktails
                </Link>
                <Link href="/buy" className="mb-4 text-xs font-light hover:underline">
                  Collections
                </Link>
                <Link href="/buy" className="mb-4 text-xs font-light hover:underline">
                  Vive la Vodka!
                </Link>
                <Link href="/buy" className="mb-4 text-xs font-light hover:underline">
                  Cocktail Experiences
                </Link>
                <span className="grow" />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
