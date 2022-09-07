import React from 'react';
import { HotPriceSlider } from '../../components/HotPriceSlider';
import { NewMobileSlider } from '../../components/NewMobileSlider';
import { ProductByCategory } from '../../components/ProductByCategory';
import { TopSlider } from '../../components/TopSlider';
import './HomePage.scss';

export const HomePage:React.FC = () => {
  return (
    <div className="home">
      <TopSlider />
      <HotPriceSlider />
      <ProductByCategory />
      <NewMobileSlider />
    </div>
  );
};
