import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchProducts from '../../utils/useFetchProducts';
import styles from './ProductOfTheDayCard.module.scss';
import { Heart } from 'lucide-react';
import {
  addToWishlist,
  removeLikeProductbyIdFromCart,
  initLikeDataFromLocalStorage,
} from '../../store/slices/likeSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { useDialog } from '../../context/DialogContect';

import { BASE_BACKEND_URL } from '../../utils/env';

const getSeededRandomIndex = (seed, max) => {
  return seed % max;
};

const ProductOfTheDayCard = () => {
  const { closeDialog } = useDialog();
  const { data, loading, error } = useFetchProducts('all');
  const [productOfTheDay, setProductOfTheDay] = useState(null);

  const dispatch = useDispatch();
  const likeItems = useSelector((state) => state.like.likesData);

  useEffect(() => {
    dispatch(initLikeDataFromLocalStorage());
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const savedData = JSON.parse(localStorage.getItem('productOfTheDay'));

      if (savedData && savedData.date === today) {
        setProductOfTheDay(savedData.product);
      } else {
        const seed = new Date(today).getTime();
        const randomIndex = getSeededRandomIndex(seed, data.length);
        const selectedProduct = data[randomIndex];

        setProductOfTheDay(selectedProduct);
        localStorage.setItem(
          'productOfTheDay',
          JSON.stringify({ date: today, product: selectedProduct })
        );
      }
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!productOfTheDay) return <div>No product available</div>;

  const { image, title, price } = productOfTheDay;
  const discountPercentage = 50;
  const discont_price = price / 2;
  const imageUrl = `${BASE_BACKEND_URL}${image}`;

  const handleLike = () => {
    if (!productOfTheDay) return;

    const isItLiked = likeItems.some(
      (likeItem) => likeItem.id === productOfTheDay.id
    );
    if (isItLiked) {
      dispatch(removeLikeProductbyIdFromCart(productOfTheDay.id));
    } else {
      dispatch(addToWishlist({ ...productOfTheDay, discont_price: price / 2 }));
    }
  };
  const handleCart = () => {
    dispatch(addToCart({ ...productOfTheDay, discont_price: price / 2 }));
    closeDialog();
  };
  return (
    <div className={styles.productOfTheDayCard}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImageWrapper}>
          <img src={imageUrl} className={styles.productImage} alt={title} />
          {discont_price > 0 && (
            <div className={styles.discountChip}>
              &#8722;{discountPercentage}&#37;
            </div>
          )}
          <button
            className={`${styles.heartBtn}  ${
              likeItems.some((item) => item.id === productOfTheDay?.id)
                ? styles.icons_active
                : ''
            }`}
            onClick={handleLike}
          >
            <Heart />
          </button>
        </div>
        <div className={styles.cardDetails}>
          <h3 className={styles.productTitle}>{title}</h3>
          <div className={styles.priceContainer}>
            <div className={styles.priceWrapper}>
              {discont_price > 0 ? (
                <>
                  <p className={styles.discontPrice}>&#36;{discont_price}</p>
                  <p className={styles.originalPrice}>&#36;{price}</p>
                </>
              ) : (
                <p className={styles.discontPrice}>&#36;{price}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleCart} className={styles.addToCart} type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductOfTheDayCard;
