'use client';

import { ChevronDown, Globe, MapPin, Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';

export default function Navbar() {
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
      <div className="container flex flex-col items-center">
        <div className="flex w-full justify-between py-0 pl-12">
          <Link href="/" className="flex items-center space-x-2 pt-2">
            <Image
              src="/media/nav-desktop-logo-blue.svg"
              alt="Grey Goose"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex flex-row items-center space-x-4">
            <div className="flex w-full items-center space-x-4">
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
            <nav className="relative flex h-16 items-center justify-end">
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
      </div>
      {activeDropdown && (
        <div className="absolute left-0 right-0 bg-white pl-12 shadow-md">
          <div className="container py-8">
            {activeDropdown === 'products' && (
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Vodka</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/products/original" className="hover:underline">
                        Original
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/vx" className="hover:underline">
                        VX
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/ducasse" className="hover:underline">
                        Ducasse
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Flavored Vodka</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/products/citron" className="hover:underline">
                        Citron
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/orange" className="hover:underline">
                        Orange
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/poire" className="hover:underline">
                        La Poire
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Limited Edition</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/products/riviera" className="hover:underline">
                        Riviera
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/winter" className="hover:underline">
                        Winter Vodka
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/anniversary" className="hover:underline">
                        Anniversary Edition
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {activeDropdown === 'cocktails' && (
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Classic</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/cocktails/martini" className="hover:underline">
                        Martini
                      </Link>
                    </li>
                    <li>
                      <Link href="/cocktails/moscow-mule" className="hover:underline">
                        Moscow Mule
                      </Link>
                    </li>
                    <li>
                      <Link href="/cocktails/cosmopolitan" className="hover:underline">
                        Cosmopolitan
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Signature</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/cocktails/le-grand-fizz" className="hover:underline">
                        Le Grand Fizz
                      </Link>
                    </li>
                    <li>
                      <Link href="/cocktails/espresso-martini" className="hover:underline">
                        Espresso Martini
                      </Link>
                    </li>
                    <li>
                      <Link href="/cocktails/grey-goose-spritz" className="hover:underline">
                        Grey Goose Spritz
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Seasonal</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/cocktails/summer-breeze" className="hover:underline">
                        Summer Breeze
                      </Link>
                    </li>
                    <li>
                      <Link href="/cocktails/winter-warmer" className="hover:underline">
                        Winter Warmer
                      </Link>
                    </li>
                    <li>
                      <Link href="/cocktails/autumn-spice" className="hover:underline">
                        Autumn Spice
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
