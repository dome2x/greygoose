import { Button } from '@components/ui/button';
import { useRouter } from '@i18n/routing';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export type Locale = {
  name: string;
  code: string;
  ch: string;
};

export type Props = {
  locales: Locale[];
};

// export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {

export default function LocaleSelector(props: Props) {
  const { locales } = props || { locales: [] };
  const router = useRouter();
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('en-GB');

  const toggleLocale = () => {
    setIsLocaleOpen(!isLocaleOpen);
  };

  const changeLocale = (locale: string) => {
    setCurrentLocale(locale);
    setIsLocaleOpen(false);
    // Here you would typically also change the app's locale
    router.replace(`${window.location.pathname.substring(6)}`, { locale });
  };

  return (
    <>
      {locales && (
        <div className="z-20 flex items-center space-x-6">
          <div className="relative">
            <Button
              size={'icon'}
              variant="ghost"
              aria-label="Change locale"
              onClick={toggleLocale}
              title={currentLocale}
            >
              <Globe className="h-5 w-5" />
            </Button>
            {isLocaleOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {locales &&
                    locales.length > 0 &&
                    locales.map((locale: Locale) => {
                      return (
                        <button
                          key={locale.code}
                          onClick={() => changeLocale(locale.code)}
                          className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          <span className="mr-2">{locale.ch}</span>
                          {locale.name}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
