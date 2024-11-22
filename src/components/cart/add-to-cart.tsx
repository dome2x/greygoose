'use client';

import { addItem } from '@components/cart/actions';
import LoadingDots from '@components/loading-dots';
import { Button } from '@components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { VercelProductVariant as ProductVariant } from '@lib/bigcommerce/types';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button
        aria-label="Please select an option"
        aria-disabled
        className="bg-[#b5985a] hover:bg-[#9a8049]"
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </Button>
      // <button
      //   aria-label="Please select an option"
      //   aria-disabled
      //   className={clsx(buttonClasses, disabledClasses)}
      // >
      //   <div className="absolute left-0 ml-4">
      //     <PlusIcon className="h-5" />
      //   </div>
      //   Add To Cart
      // </button>
    );
  }

  return (
    <>
      <Button
        aria-label="Add to cart"
        aria-disabled={pending}
        className="bg-[#b5985a] hover:bg-[#9a8049]"
      >
        <div className="absolute left-0 ml-4">
          {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
        </div>
        Add To Cart
      </Button>
      {/* <button
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          if (pending) e.preventDefault();
        }}
        aria-label="Add to cart"
        aria-disabled={pending}
        className={clsx(buttonClasses, {
          'hover:opacity-90': true,
          disabledClasses: pending
        })}
      >
        <div className="absolute left-0 ml-4">
          {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
        </div>
        Add To Cart
      </button> */}
    </>
  );
}

export function AddToCart({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const defaultProductId = variants.length === 1 ? variants[0]?.parentId : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const selectedProductId = variant?.parentId || defaultProductId;
  const actionWithVariant = formAction.bind(null, { selectedProductId, selectedVariantId });

  return (
    <form action={actionWithVariant}>
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
