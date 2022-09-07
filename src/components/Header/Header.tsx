import React, { useEffect } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import classname from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getPath } from '../../store/selectors';
import { setPath } from '../../store';

export const Header:React.FC = () => {
  const dispatch = useDispatch();
  const pathArray = ['home', 'phones', 'tablets', 'acsessories'];
  const path = useSelector(getPath);
  const checkout = [];
  const favorite = [];

  useEffect(() => {
    const linkhreff = window.location.href;
    let staticHref = 'home';

    if (linkhreff !== 'http://localhost:3000/#/') {
      staticHref = linkhreff.replace('http://localhost:3000/#/', '');
    }

    dispatch(setPath(staticHref));
  }, []);

  return (
    <header className="navbar" id="header">
      <nav>
        <Link
          to="/"
          className="navbar__logo"
          onClick={() => dispatch(setPath('home'))}
        >
          <img src="./images/LOGO.svg" alt="" />
        </Link>
        {pathArray.map((linkpath:string) => (
          <Link
            key={linkpath}
            to={linkpath}
            className={classname('navbar__link',
              { 'navbar__is-active navbar__link-active': path === linkpath })}
            onClick={() => dispatch(setPath(linkpath))}
          >
            {linkpath}
          </Link>
        ))}
      </nav>
      <nav className="navbar__right-box">
        <Link
          to="liked_product"
          className={classname('navbar__liked',
            {
              'navbar__is-active navbar__link-active': path === 'liked_product',
            })}
          onClick={() => dispatch(setPath('liked_product'))}
        >
          <img
            src={path === 'liked_product'
              ? './images/heart.png'
              : './images/Vector(Stroke).svg'}
            alt=""
          />
          {
            favorite.length > 0 && path !== 'liked_product' && (
              <div className="numberOfFavorite">{favorite.length}</div>
            )
          }
        </Link>
        <Link
          to="checkout"
          className={classname('navbar__checkout',
            { 'navbar__is-active navbar__link-active': path === 'checkout' })}
          onClick={() => dispatch(setPath('checkout'))}
        >
          <img src="./images/Shoppingbag(Cart).svg" alt="" />
          {
            checkout.length > 0 && path !== 'checkout' && (
              <div className="numberOfFavorite">{checkout.length}</div>
            )
          }
        </Link>
      </nav>
    </header>
  );
};
