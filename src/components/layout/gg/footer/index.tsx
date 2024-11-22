import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="w-full">
      {/* Newsletter Section */}
      <div className="bg-[#3e2a1d] bg-[url('/media/assets_8d037472ddea4270ba7fee1b930ca367_b73d0dd327e2449d8e428ee15e42d391.jpeg')] bg-cover bg-center py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-sm tracking-widest">{t('stay_in_the_know')}</p>
          <h2 className="mb-6 text-2xl font-light tracking-wider">
            {t('get_the_latest_news_in_your_box')}
          </h2>
          <form className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row">
            <Input type="text" placeholder="Your name" className="bg-white text-black" />
            <Input type="email" placeholder="Your e-mail" className="bg-white text-black" />
            <Button className="bg-[#b5985a] hover:bg-[#9a8049]">SUBMIT</Button>
          </form>
        </div>
      </div>

      {/* Logo */}
      <div className="container mx-auto px-4 py-8 text-center">
        <Link href="/" className="text-xl font-light tracking-widest text-[#b5985a]">
          Grey Goose
        </Link>
        <p className="text-xs text-muted-foreground">{t('since')}</p>
      </div>

      {/* Main Navigation */}
      <nav className="border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 py-4 text-center text-sm md:grid-cols-4 lg:grid-cols-7">
            <Link href="#" className="hover:text-[#b5985a] text-nowrap">
              {t('about')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a] text-nowrap">
              {t('heritage')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a] text-nowrap">
              {t('press')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a] text-nowrap">
              {t('payment')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a] text-nowrap">
              {t('contact')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a] text-nowrap text-right">
              {t('customer_service')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a] text-nowrap text-right">
              {t('FAQS')}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t py-4 text-center text-sm md:grid-cols-3 lg:grid-cols-6">
            <Link href="#" className="hover:text-[#b5985a]">
              {t('shop')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a]">
              {t('store_locator')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a]">
              {t('track_order')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a]">
              {t('cigar_knowledge')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a]">
              {t('news_events')}
            </Link>
            <Link href="#" className="hover:text-[#b5985a]">
              {t('retailer_portal')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Social Media */}
      <div className="container mx-auto flex justify-center gap-6 py-8">
        <Link href="#" className="text-muted-foreground hover:text-[#b5985a]">
          <Facebook className="h-6 w-6" />
          <span className="sr-only">Facebook</span>
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-[#b5985a]">
          <Instagram className="h-6 w-6" />
          <span className="sr-only">Instagram</span>
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-[#b5985a]">
          <Youtube className="h-6 w-6" />
          <span className="sr-only">YouTube</span>
        </Link>
      </div>

      {/* Warning Message */}
      <div className="bg-muted py-4 text-center text-sm">
        <p className="font-semibold">{t('surgeon_general_warning_title')}</p>
        <p className="text-muted-foreground">{t('surgeon_general_warning')}</p>
      </div>

      {/* Security Badges */}
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="mb-4 text-xs uppercase text-muted-foreground">
          Highest level of encryption, security and trust
        </p>
        <div className="flex justify-center gap-8">
          <Image
            src="/placeholder.svg"
            alt="Veratad"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
          <Image src="/placeholder.svg" alt="CSC" width={120} height={40} className="h-10 w-auto" />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">{t('copyright')}</p>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <Link href="#" className="hover:text-[#b5985a]">
            {t('terms_and_conditions')}
          </Link>
          <Link href="#" className="hover:text-[#b5985a]">
            {t('privacy_policy')}
          </Link>
          <Link href="#" className="hover:text-[#b5985a]">
            {t('privacy_settings')}
          </Link>
          <Link href="#" className="hover:text-[#b5985a]">
            {t('accessibility')}
          </Link>
          <Link href="#" className="hover:text-[#b5985a]">
            {t('cookie_policy')}
          </Link>
          <Link href="#" className="hover:text-[#b5985a]">
            {t('about_oettinger_greygoose_ag')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
