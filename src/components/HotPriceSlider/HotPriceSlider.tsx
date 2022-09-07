import React from 'react';
import { useSelector } from 'react-redux';
import './HotPriceSlider.scss';
import { Slider } from '../Slider';
import { getHotPriceProducts } from '../../store/selectors';

export const HotPriceSlider:React.FC = () => {
  const hotPriceProduct = useSelector(getHotPriceProducts);

  return (
    <section className="hot_price">
      <p className="hot_price__title">Hot price</p>
      <Slider product={hotPriceProduct} />
    </section>
  );
};
