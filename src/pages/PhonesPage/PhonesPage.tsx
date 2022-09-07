import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShowProductOnPage } from '../../components/ShowProductOnPage';
import { setPath } from '../../store';
import { getPhones } from '../../store/selectors';
import './PhonesPage.scss';

export const PhonesPage:React.FC = () => {
  const dispatch = useDispatch();
  const phones = useSelector(getPhones);

  return (
    <div className="phones">
      <div className="phones__path_container">
        <Link
          to="/"
          className="prodByCategories__link"
          onClick={() => dispatch(setPath('home'))}
        >
          <img className="phones__home_img" src="./images/Home.svg" alt="" />
        </Link>
        <img className="phones__right_img" src="./images/right.svg" alt="" />
        <p className="phones__path">Phone</p>
      </div>
      <p className="phones__title">Mobile Phones</p>
      <p className="phones__numberOfPhones">{`${phones.length} models`}</p>
      <ShowProductOnPage product={phones} />
    </div>
  );
};
