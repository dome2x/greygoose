'use client';
import { builder, Builder } from '@builder.io/react';
import ProductCarousel from '@components/gg/grid/three-items';
import Hero from '@components/gg/hero';
import ProductCollection from '@components/gg/product/product-collection';
import Footer from '@components/layout/gg/footer';
import Navbar from '@components/layout/gg/navbar';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Hero, {
  name: 'Hero'
});

Builder.registerComponent(Footer, {
  name: 'Footer'
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
