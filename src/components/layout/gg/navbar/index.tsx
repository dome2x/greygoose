'use client';

import { builder } from '@builder.io/sdk';
import { ChevronDown, Globe, MapPin, Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

type MenuItems = {
  itemTitle: string;
  itemTarget: string;
  itemMedia: string;
  submenu?: MenuItems[];
};
type NavMenus = {
  brand: string;
  menu: MenuItems[];
};

type BrandMenu = {
  brandMenu: NavMenus[];
};

// Replace with your Public API Key.
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function Navbar() {
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  console.log('****************** LOCALE', locale);
  const menuData = useQuery<BrandMenu>({
    queryKey: ['menu'],
    queryFn: async () => {
      try {
        const res = await builder.get('menu', { prerender: false });
        console.log('************ RES and LOCALE', res, locale);
        return res.data;
      } catch (error) {
        console.error('Error fetching menu data', error);
        return error;
      }
    }
  });
  let thisMenu = [] as MenuItems[];
  if (menuData.data) {
    console.log('****************** menu', menuData.data);
    const thisBrandsMenu = menuData.data.brandMenu.filter((item) => item.brand === 'Grey Goose');
    console.log('****************** FILTERED menu', thisBrandsMenu);
    thisMenu = thisBrandsMenu.flatMap((item) => {
      return item.menu.map((menuItem) => {
        return {
          itemTitle: menuItem.itemTitle,
          itemTarget: menuItem.itemTarget,
          itemMedia: menuItem.itemMedia,
          submenu: menuItem.submenu?.map((subMenuItem) => {
            return {
              itemTitle: subMenuItem.itemTitle,
              itemTarget: subMenuItem.itemTarget,
              itemMedia: subMenuItem.itemMedia
            };
          })
        };
      });
    });
    console.log('****************** FILTERED menu', thisMenu);
  }

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
        <div className="grow" />
        <div className="mr-8 flex-shrink-0 pl-12">
          <Link href={`/${locale}/gg/home`} className="block py-4">
            <Image
              src={
                isScrolled || activeDropdown
                  ? '/media/nav-desktop-logo-blue.svg'
                  : '/media/nav-desktop-logo-white.svg'
              }
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
              {thisMenu.map((brandMenu) => (
                <Button
                  key={brandMenu.itemTitle}
                  variant="ghost"
                  className="text-sm font-medium uppercase tracking-wide"
                  onClick={
                    brandMenu.submenu && brandMenu.submenu.length > 0
                      ? () => toggleDropdown(brandMenu.itemTitle)
                      : () => {}
                  }
                >
                  {brandMenu.itemTitle}{' '}
                  {brandMenu.submenu && brandMenu.submenu.length > 0 ? (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  ) : (
                    <></>
                  )}
                </Button>
              ))}
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
            {thisMenu.map((brandMenu) => {
              if (brandMenu.submenu && brandMenu.submenu.length > 0) {
                return (
                  <>
                    {activeDropdown === brandMenu.itemTitle && (
                      <div className="flex-cols flex justify-center gap-8">
                        <span className="grow" />
                        {brandMenu.submenu.map((subMenu) => (
                          <Link
                            key={subMenu.itemTitle}
                            href={subMenu.itemTarget}
                            className="mb-4 text-xs font-light uppercase hover:underline"
                          >
                            {subMenu.itemTitle}
                          </Link>
                        ))}
                        <span className="grow" />
                      </div>
                    )}
                  </>
                );
              }
            })}
          </div>
        </div>
      )}
    </header>
  );
}
