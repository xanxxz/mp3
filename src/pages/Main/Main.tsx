import React from 'react';
import { MiniCatalog } from 'components/UI/MiniCatalog/MiniCatalog';
import { BrandCarousel } from 'components/UI/BrandCarousel/BrandCarousel';
import { AboutUs } from 'components/UI/AboutUs/AboutUs';
import { HeroCarousel } from 'components/UI/HeroCarousel/HeroCarousel';

const Main: React.FC = () => {
  return <>
    <HeroCarousel />
    <MiniCatalog />
    <BrandCarousel />
    <AboutUs />
  </>;
};

export default Main;
