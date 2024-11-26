import { Link } from '@i18n/routing';
import { SiFacebook, SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons';
import { rgba2hex } from '@lib/utils';

export default function Footer({
  bgcolor,
  fgcolor,
  copyright
}: {
  bgcolor: string;
  fgcolor: string;
  copyright: string;
}) {
  const bg =
    bgcolor !== '' && bgcolor !== undefined
      ? `bg-[#${rgba2hex(bgcolor).slice(0, -2).toUpperCase()}]`
      : 'bg-[#00205B]';
  const fg =
    fgcolor !== '' && fgcolor !== undefined
      ? `text-[#${rgba2hex(fgcolor).slice(0, -2).toLowerCase()}]`
      : 'text-[#ffffff]';
  return (
    <footer className={`${bg} ${fg} px-4 py-8`}>
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
          <Link href="/" className="hover:underline">
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
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
