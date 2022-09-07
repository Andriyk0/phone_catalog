import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShowProductOnPage } from '../../components/ShowProductOnPage';
import { setPath } from '../../store';
import { getAccessories } from '../../store/selectors';
import './AcsessoriesPage.scss';

export const AcsessoriesPage:React.FC = () => {
  const dispatch = useDispatch();
  const ascessories = useSelector(getAccessories);

  return (
    <div className="ascessories">
      <div className="ascessories__path_container">
        <Link
          to="/"
          className="prodByCategories__link"
          onClick={() => dispatch(setPath('home'))}
        >
          <img
            className="ascessories__home_img"
            src="./images/Home.svg"
            alt=""
          />
        </Link>
        <img
          className="ascessories__right_img"
          src="./images/right.svg"
          alt=""
        />
        <p className="ascessories__path">Phone</p>
      </div>
      <p className="ascessories__title">Mobile ascessories</p>
      <p className="ascessories__numberOfascessories">{`${ascessories.length} models`}</p>
      <ShowProductOnPage product={ascessories} />
    </div>
  );
};
