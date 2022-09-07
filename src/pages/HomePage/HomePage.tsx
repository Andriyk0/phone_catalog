import React from 'react';
import { HotPriceSlider } from '../../components/HotPriceSlider';
import { TopSlider } from '../../components/TopSlider';
import './HomePage.scss';

export const HomePage:React.FC = () => {
  return (
    <div className="home">
      <TopSlider />
      <HotPriceSlider />
    </div>
  );
};
