import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShowProductOnPage } from '../../components/ShowProductOnPage';
import { setPath } from '../../store';
import { getTablets } from '../../store/selectors';
import './TabletsPage.scss';

export const TabletsPage:React.FC = () => {
  const dispatch = useDispatch();
  const tablets = useSelector(getTablets);

  return (
    <div className="tablets">
      <div className="tablets__path_container">
        <Link
          to="/"
          className="prodByCategories__link"
          onClick={() => dispatch(setPath('home'))}
        >
          <img className="tablets__home_img" src="./images/Home.svg" alt="" />
        </Link>
        <img className="tablets__right_img" src="./images/right.svg" alt="" />
        <p className="tablets__path">Tablets</p>
      </div>
      <p className="tablets__title">Tablets</p>
      <p className="tablets__numberOftablets">{`${tablets.length} models`}</p>
      <ShowProductOnPage product={tablets} />
    </div>
  );
};
