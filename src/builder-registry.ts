'use client';
import { builder, Builder } from '@builder.io/react';
import Footer from '@components/layout/gg/footer';
import Hero from '@components/gg/hero';
import Navbar from '@components/layout/gg/navbar';
import ProductCarousel from '@components/gg/grid/three-items';
import ProductCollection from '@components/gg/product/product-collection';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Hero, {
  name: 'Hero'
});

Builder.registerComponent(Footer, {
  name: 'Footer',
  inputs: [
    {
      name: 'bgcolor',
      type: 'color'
    },
    {
      name: 'fgcolor',
      type: 'color'
    },
    {
      name: 'copyright',
      type: 'string'
    }
  ]
});

Builder.registerComponent(ProductCarousel, {
  name: 'ProductCarousel'
});

Builder.registerComponent(ProductCollection, {
  name: 'ProductCollection',
  inputs: [
    {
      name: 'collection',
      type: 'BigCommerceProductsList'
    }
  ]
});

Builder.registerComponent(Navbar, {
  name: 'NavBar'
});
