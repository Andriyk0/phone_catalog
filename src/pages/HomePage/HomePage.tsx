import React from 'react';
import { TopSlider } from '../../components/TopSlider';
import './HomePage.scss';

export const HomePage:React.FC = () => {
  return (
    <div className="home">
      <TopSlider />
    </div>
  );
};
