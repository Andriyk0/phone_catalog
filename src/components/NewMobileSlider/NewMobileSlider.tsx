import React from 'react';
import { useSelector } from 'react-redux';
import './NewMobileSlider.scss';
import { Slider } from '../Slider';
import { getNewPhones } from '../../store/selectors';

export const NewMobileSlider:React.FC = () => {
  const newPhones = useSelector(getNewPhones);

  return (
    <section className="new_phones">
      <p className="new_phones__title">Brand new models</p>
      <Slider product={newPhones} />
    </section>
  );
};
