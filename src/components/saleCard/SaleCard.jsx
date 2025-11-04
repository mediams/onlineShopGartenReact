import React from 'react';
import styles from './SaleCard.module.scss';
import { useTheme } from '../../context/ThemeContext';

import { BASE_BACKEND_URL } from '../../utils/env';

const SaleCard = ({ title, image, discont_price, price }) => {
  const { isDarkTheme } = useTheme();
  const cardBackground = isDarkTheme
    ? styles.productCard_text_dark
    : styles.productCard_text_light;

  // Если скидка есть, то показываем цену со скидкой, иначе обычную цену
  const actualPrice = discont_price > 0 ? discont_price : price;
  const discountPercentage = Math.round(100 - (discont_price * 100) / price);
  return (
    <div className={styles.productCard}>
      <div className={styles.productCard_image}>
        <img
          className={styles.image}
          src={`${BASE_BACKEND_URL}${image}`}
          alt={`Product ${title}`}
        />
      </div>
      {discont_price > 0 && (
        <div className={styles.productCard_discount}>
          -{discountPercentage}%
        </div>
      )}
      <div className={`${styles.productCard_text} ${cardBackground}`}>
        <h3>{title}</h3>
        <div className={styles.productCard_text_priceBlock}>
          <p className={styles.productCard_text_actualPrice}>${actualPrice}</p>
          {discont_price > 0 && (
            <p className={styles.productCard_text_price}>${price}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaleCard;
