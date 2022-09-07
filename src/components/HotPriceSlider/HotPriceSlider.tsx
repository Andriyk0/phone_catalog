import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import './HotPriceSlider.scss';
import {
  getCheckout, getFavorite, getHotPriceProducts,
} from '../../store/selectors';
import {
  delCheckout, delFavorite, setCheckout, setDetailProduct, setFavorite, setPath,
} from '../../store';
import { goToTop } from '../Footer';

export const includeProd = (products:Product[], favProd:Product) => {
  return products.some((item:Product) => item.id === favProd.id);
};

export const HotPriceSlider:React.FC = () => {
  const dispatch = useDispatch();
  const hotPriceProducts = useSelector(getHotPriceProducts);
  const favorite = useSelector(getFavorite);
  const checkout = useSelector(getCheckout);
  const [sliderCount, setSliderCount] = useState(4);
  const [showCard, setShowCard] = useState<Product[]>([]);

  useEffect(() => {
    setShowCard([...hotPriceProducts].splice(0, 4));
  }, [hotPriceProducts]);

  const next = () => {
    if (sliderCount < hotPriceProducts.length) {
      setShowCard([...hotPriceProducts].splice(sliderCount, 4));
      setSliderCount(sliderCount + 4);
    }
  };

  const minusCount = () => {
    setSliderCount(sliderCount - 4);

    return sliderCount - 8;
  };

  const prev = () => {
    if (sliderCount > 4) {
      const a = minusCount();

      setShowCard([...hotPriceProducts].splice(a, 4));
    }
  };

  const goToProductDetails = (product:Product) => {
    dispatch(setDetailProduct(product));
    dispatch(setPath('product_details'));
  };

  return (
    <section className="hot_price">
      <p className="hot_price__title">Hot price</p>
      <button
        type="button"
        onClick={() => next()}
        className="mySlider__next_button"
      >
        <img src="./images/right.svg" alt="" />
      </button>
      <button
        type="button"
        onClick={() => prev()}
        className="mySlider__prev_button"
      >
        <img src="./images/left.svg" alt="" />
      </button>
      <div className="mySlider">
        {
          showCard.map(item => (
            <div key={item.id} className="mySlider__product_box">
              <div className="mySlider__image_box">
                <Link
                  onClick={() => {
                    goToProductDetails(item);
                    goToTop();
                  }}
                  to="product_details"
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
    </section>
  );
};
