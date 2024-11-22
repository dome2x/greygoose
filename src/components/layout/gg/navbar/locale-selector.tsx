import { useRouter } from "@i18n/routing"
import { Globe } from "lucide-react"
import { useState } from "react"

export default function LocaleSelector() {
  const router = useRouter()
  const [isLocaleOpen, setIsLocaleOpen] = useState(false)
  const [currentLocale, setCurrentLocale] = useState('en-GB')

  const toggleLocale = () => {
    setIsLocaleOpen(!isLocaleOpen)
  }

  const changeLocale = (locale: string) => {
    setCurrentLocale(locale)
    setIsLocaleOpen(false)
    // Here you would typically also change the app's locale
    router.replace(`${window.location.pathname.substring(6)}`, {locale});
  }

  return (
    <>
      <div className="flex items-center space-x-6 z-20">
        <div className="relative">
          <button
            className="text-[#d4af37]"
            aria-label="Change locale"
            onClick={toggleLocale}
            title={currentLocale}
          >
            <Globe size={24} />
          </button>
          {isLocaleOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  onClick={() => changeLocale('en-GB')}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  <span className="mr-2">🇬🇧</span>
                  English (UK)
                </button>
                <button
                  onClick={() => changeLocale('de-DE')}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  <span className="mr-2">🇩🇪</span>
                  Deutsch
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}