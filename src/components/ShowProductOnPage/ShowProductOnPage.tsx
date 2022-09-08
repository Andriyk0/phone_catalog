import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import {
  delCheckout, delFavorite, setCheckout, setDetailProduct, setFavorite, setPath,
} from '../../store';
import { getCheckout, getFavorite } from '../../store/selectors';
import './ShowProductOnPage.scss';
import { goToTop } from '../Footer';
import { includeProd } from '../Slider';
import { Loader } from '../Loader';

type Props = {
  product: Product[]
};

export const ShowProductOnPage:React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const favorite = useSelector(getFavorite);
  const checkout = useSelector(getCheckout);
  const [
    ProductLength, setProductLength,
  ] = useState<(string | number)[]>(['All']);
  const sortProductCategory:string[]
    = ['All', 'Cheep', 'Expensive', 'New', 'Old'];
  const [sortValue, setSortValue] = useState<string>('All');
  const [itemValue, setItemValue] = useState('All');
  const [selectPage, setSelectPage] = useState<number>(1);
  const [showProduct, setShowProduct] = useState([...product]);
  const [numberOfPage, setNumberOfPage] = useState([1]);

  const createNumberArr = () => {
    const arr = [];

    for (let i = 4; i <= product.length; i += 4) {
      arr.push(i);
    }

    return setProductLength([...ProductLength, ...arr]);
  };

  const sortProduct = (event:string) => {
    let rezult;

    if (event === 'Cheep') {
      rezult = [...product].sort((a, b) => a.price - b.price);
    } else if (event === 'Expensive') {
      rezult = [...product].sort((a, b) => b.price - a.price);
    } else if (event === 'New') {
      rezult = [...product].sort((a, b) => a.age - b.age);
    } else if (event === 'Old') {
      rezult = [...product].sort((a, b) => b.age - a.age);
    } else if (event === 'All') {
      rezult = [...product];
    }

    return rezult;
  };

  const showProductOnPage
  = (num: number, item: number | string, sortV: string) => {
    const rezult = sortProduct(sortV);

    if (rezult && item !== 'All') {
      setShowProduct(rezult
        .splice(num * Number(item) - Number(item), num * Number(item)));
      setNumberOfPage(Array.from({
        length: Math.ceil(product.length
        / Number(item)),
      }, (_, i) => i + 1));
      setSelectPage(num);
    } else if (rezult && item === 'All') {
      setShowProduct(rezult
        .splice(num * product.length - product.length, num * product.length));
      setSelectPage(num);
      setNumberOfPage([1]);
    }
  };

  useEffect(() => {
    createNumberArr();
    setShowProduct([...product]);
  }, [product]);

  const goToProductDetails = (prod:Product) => {
    dispatch(setDetailProduct(prod));
    dispatch(setPath('product_details'));
  };

  return (
    <>
      <div className="product__filters">
        <div className="product__sort">
          <label className="product__label" htmlFor="categories">Sort by</label>
          <select
            className="product__select_sort"
            id="categories"
            value={sortValue}
            onChange={(event) => {
              showProductOnPage(selectPage, itemValue, event.target.value);
              setSortValue(event.target.value);
            }}
          >
            { sortProductCategory.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="product__sort">
          <label
            className="product__label"
            htmlFor="numbersOfProduct"
          >
            Item on page
          </label>
          <select
            className="product__select_item"
            id="numbersOfProduct"
            value={itemValue}
            onChange={(event) => {
              showProductOnPage(selectPage, event.target.value, sortValue);
              setItemValue(event.target.value);
            }}
          >
            { ProductLength.map(item => (
              <option key={uuid()} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="cards">
        {
          showProduct.map(item => (
            <div className="mySlider__product_box" key={item.id}>
              <div className="mySlider__image_box">
                <Link
                  key={item.id}
                  onClick={() => {
                    goToProductDetails(item);
                    goToTop();
                  }}
                  to="/product_details"
                >
                  <img
                    className="mySlider__image"
                    src={item.imageUrl}
                    alt=""
                  />
                </Link>
              </div>
              <p className="mySlider__name">{item.name}</p>
              <div className="mySlider__price_box">
                <p className="mySlider__discount_price">{`$${item.price - ((item.price * item.discount) / 100)}`}</p>
                <p className="mySlider__price">{`$${item.price}`}</p>
              </div>
              <div className="mySlider__screen_box">
                <p className="mySlider__screen_title">Screen</p>
                <p className="mySlider__screen_info">{item.screen}</p>
              </div>
              <div className="mySlider__capasity_box">
                <p className="mySlider__capasity_title">Capasity</p>
                <p className="mySlider__capasity_info">{item.capacity}</p>
              </div>
              <div className="mySlider__ram_box">
                <p className="mySlider__ram_title">RAM</p>
                <p className="mySlider__ram_info">{item.ram}</p>
              </div>
              <div className="mySlider__button_box">
                <button
                  className={classnames('mySlider__add_button',
                    { mySlider__checkout_btn: includeProd(checkout, item) })}
                  type="button"
                  onClick={() => (includeProd(checkout, item)
                    ? dispatch(delCheckout(item))
                    : dispatch(setCheckout(item)))}
                >
                  {includeProd(checkout, item)
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>
                <button
                  className="mySlider__like_button"
                  type="button"
                  onClick={() => (includeProd(favorite, item)
                    ? dispatch(delFavorite(item))
                    : dispatch(setFavorite(item)))}
                >
                  { includeProd(favorite, item)
                    ? <img src="./images/heart.png" alt="" />
                    : <img src="./images/Vector(Stroke).svg" alt="" />}
                </button>
              </div>
            </div>
          ))
        }
      </div>
      {
        product.length === 0 && (
          <>
            <p className="noProduct">No Product</p>
            <Loader />
          </>
        )
      }
      <div className="button">
        <button
          type="button"
          className="button__next_button"
        >
          <img src="./images/left.svg" alt="prev" />
        </button>
        {
          numberOfPage.map((item:number) => (
            <button
              key={item}
              type="button"
              onClick={() => showProductOnPage(item, itemValue, sortValue)}
              className={classnames('button__page',
                { 'button__page-active': item === selectPage })}
            >
              {item}
            </button>
          ))
        }
        <button
          type="button"
          className="button__prev_button"
        >
          <img src="./images/right.svg" alt="next" />
        </button>
      </div>
    </>
  );
};
