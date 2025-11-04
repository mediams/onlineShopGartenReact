import React from 'react';
import { useState, useEffect } from 'react';
import styles from './ProductDetailsSection.module.scss';
import ButtonLink from '../ui/ButtonLink';
import { Heart, Plus, Minus } from 'lucide-react';
import { useDialog } from '../../context/DialogContect';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartByAmount, removeItemFromCart } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import {
  addToWishlist,
  removeLikeProductbyIdFromCart,
  initLikeDataFromLocalStorage,
} from '../../store/slices/likeSlice';
import { BASE_BACKEND_URL } from '../../utils/env';

const ProductDetailsSection = ({ product, loading }) => {
  const { description, image, price, discont_price, title, id } = product;
  const { cartData } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openDialog } = useDialog();

  // Функция для переключения состояния
  const toggleDescription = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const likeItems = useSelector((state) => state.like.likesData);
  let isItLiked = likeItems.some((likeItem) => likeItem.id === id);
  useEffect(() => {
    dispatch(initLikeDataFromLocalStorage());
  }, []);
  const discountPercentage = Math.round(100 - (discont_price * 100) / price);
  const actualPrice = discont_price > 0 ? discont_price : price;
  const handleClickIcons = () => {
    if (isItLiked) {
      dispatch(removeLikeProductbyIdFromCart(id));
    } else {
      dispatch(addToWishlist(product));
    }
  };
  const handlerAddToCart = () => {
    dispatch(addToCartByAmount({ ...product, count }));
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.titleWrapper_mobile}>
        <h2 className={styles.productTitle}>{title}</h2>
        <button
          name="heart"
          className={`${styles.heartBtn} product ${isItLiked ? styles.icons_active : ''}  `}
          onClick={() => handleClickIcons(product)}
        >
          <Heart className={styles.svgLink} />
        </button>
      </div>
      <div className={styles.productImg}>
        <img
          className={styles.img}
          src={`${BASE_BACKEND_URL}${image}`}
          alt={title}
          onClick={() =>
            openDialog(
              'type1',
              <img
                className={styles.img}
                src={`${BASE_BACKEND_URL}${image}`}
                alt={title}
              />
            )
          }
        />
        {discont_price > 0 && (
          <div className={styles.discountChip_mobile}>
            &#8722;{discountPercentage}&#37;
          </div>
        )}
      </div>

      <div className={styles.productInfoWrapper}>
        <div className={styles.titleWrapper_tablet}>
          <h2 className={styles.productTitle}>{title}</h2>
          <button
            name="heart"
            className={`${styles.heartBtn} product ${isItLiked ? styles.icons_active : ''}  `}
            onClick={() => handleClickIcons(product)}
          >
            <Heart className={styles.svgLink} />
          </button>
        </div>

        <div className={styles.flexWrapper}>
          <p className={styles.productPrice}>${actualPrice}</p>
          {discont_price > 0 && (
            <p className={styles.productDiscountPrice}>&#36;{price}</p>
          )}
          {discont_price > 0 && (
            <div className={styles.discountChip}>
              &#8722;{discountPercentage}&#37;
            </div>
          )}
        </div>

        <div className={styles.actionsWrapper}>
          <div className={styles.quantityControl}>
            <button
              type="button"
              className={styles.quantityBtn}
              onClick={() => {
                setCount((prev) => Math.max(prev - 1, 1));
                if (count > 1) {
                  dispatch(removeItemFromCart(product));
                }
              }}
            >
              <Minus size={24} />
            </button>
            <div className={styles.quantityValue}>{count}</div>
            <button
              type="button"
              className={styles.quantityBtn}
              onClick={() => {
                setCount((prev) => prev + 1);
                dispatch(removeItemFromCart(product));
              }}
            >
              <Plus size={24} />
            </button>
          </div>
          {!cartData.find((item) => item.id === id) ? (
            <ButtonLink
              type="button"
              className={styles.addToCartBtn}
              onClick={handlerAddToCart}
              text={'Add to cart'}
            />
          ) : (
            <ButtonLink
              type="button"
              className={styles.addToCartBtn}
              onClick={() => navigate('/cart')}
              text={'Go to cart'}
            />
          )}
        </div>
        <div className={styles.productDescriptionWrapper_laptop}>
          <h3 className={styles.descriptionTitle}>Description</h3>
          <p className={styles.descriptionText}>
            {!loading && isExpanded
              ? description
              : typeof description === 'string'
                ? `${description.slice(0, 200)}...`
                : 'Описание недоступно'}
          </p>
          <span className={styles.moreBtn} onClick={toggleDescription}>
            {isExpanded ? 'hide' : 'Read more'}
          </span>
        </div>
      </div>

      <div className={styles.productDescriptionWrapper}>
        <h3 className={styles.descriptionTitle}>Description</h3>
        <p className={styles.descriptionText}>
          {!loading && isExpanded
            ? description
            : typeof description === 'string'
              ? `${description.slice(0, 200)}...`
              : 'Описание недоступно'}
        </p>
        <span className={styles.moreBtn} onClick={toggleDescription}>
          {isExpanded ? 'hide' : 'Read more'}
        </span>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
