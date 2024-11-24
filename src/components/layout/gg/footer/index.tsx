import { SiFacebook, SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#00205B] px-4 py-8 text-white">
      <div className="container mx-auto flex flex-col items-center gap-8">
        <h2 className="font-serif text-2xl">SIP RESPONSIBLY</h2>

        {/* Social Media Icons */}
        <div className="flex gap-6">
          <Link href="#" className="hover:opacity-80">
            <SiFacebook size={24} />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="hover:opacity-80">
            <SiX size={24} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="hover:opacity-80">
            <SiYoutube size={24} />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link href="#" className="hover:opacity-80">
            <SiInstagram size={24} />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/cookie" className="hover:underline">
            Cookie Policy
          </Link>
          <Link href="/media" className="hover:underline">
            Media
          </Link>
          <Link href="/careers" className="hover:underline">
            Careers
          </Link>
          <Link href="/faqs" className="hover:underline">
            FAQs
          </Link>
          <Link href="/sitemap" className="hover:underline">
            Site Map
          </Link>
        </nav>

        {/* Legal Text */}
        <div className="max-w-3xl space-y-2 text-center text-xs">
          <p>
            FOR MORE INFORMATION ON ALCOHOL RESPONSIBILITY VISIT:{' '}
            <Link href="https://ResponsibleDrinking.Org" className="underline">
              ResponsibleDrinking.Org
            </Link>
            ,{' '}
            <Link href="https://ResponsibleDrinking.Eu" className="underline">
              ResponsibleDrinking.Eu
            </Link>{' '}
            AND{' '}
            <Link href="https://Drinkaware" className="underline">
              Drinkaware
            </Link>
            . SHARE CONTENT WITH THOSE OF LEGAL DRINKING AGE AND OVER ONLY.
          </p>
          <p>©2024 GREY GOOSE. ITS TRADE DRESS, AND THE GEESE DEVICE ARE TRADEMARKS.</p>
        </div>
      </div>
    </footer>
  );
}
