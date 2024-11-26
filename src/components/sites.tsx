'use client';

import { Button } from '@components/ui/button';
import { useRouter } from '@i18n/routing';
import Image from 'next/image';
import WaterWave from 'react-water-wave';

export default function Sites() {
  return (
    <div className="absolute right-6 h-screen min-h-screen w-screen overflow-hidden">
      <Image
        src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTU5NDg4NC1pbWFnZS1rd3Z4cnkzaC5qcGc.jpg"
        alt="Underwater background"
        className="absolute inset-0 h-full w-full fill-inherit object-cover"
        quality={100}
        height={2000}
        width={2000}
        priority
      />
      <WaterWave
        imageUrl="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTU5NDg4NC1pbWFnZS1rd3Z4cnkzaC5qcGc.jpg"
        style={{ width: '100%', height: '100%', zOrder: -10 }}
        dropRadius={10}
        perturbance={0.3}
      >
        {() => (
          <>
            {/* <div className="absolute inset-0 bg-black bg-opacity-30" /> */}
            <div className="absolute inset-0 z-10 flex min-h-screen items-center justify-center">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <AnimatedButton
                  image="/media/grey-goose-thumbnail.jpg"
                  text="Grey Goose"
                  target="/gg/home"
                />
                <AnimatedButton image="/media/patron.jpg" text="Patron" target="/p/home" />
              </div>
            </div>
          </>
        )}
      </WaterWave>
    </div>
  );
}

interface AnimatedButtonProps {
  image: string;
  text: string;
  target: string;
}

function AnimatedButton({ image, text, target }: AnimatedButtonProps) {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      className="group relative h-48 w-48 flex-col space-y-4 overflow-hidden rounded-xl border-2 border-white/20 bg-white/10 p-0 text-xl text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:text-black"
      onClick={() => {
        router.push(target);
      }}
    >
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <div className="relative mb-2 h-24 w-24">
          <Image
            src={image}
            alt={text}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 96px, 96px"
          />
        </div>
        <span className="mt-2">{text}</span>
      </div>
    </Button>
  );
}
