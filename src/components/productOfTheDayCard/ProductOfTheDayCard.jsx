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
import { addToCartByAmount } from '../../store/slices/cartSlice';
import { useDialog } from '../../context/DialogContect';

// ВАЖНО: единая нормализация товара
import { ensureProductShape, resolveProductImageUrl } from '../../utils/productUtils';

const getSeededRandomIndex = (seed, max) => seed % max;

const ProductOfTheDayCard = () => {
  const { closeDialog } = useDialog();
  const { data, loading, error } = useFetchProducts('all');
  const [productOfTheDay, setProductOfTheDay] = useState(null);

  const dispatch = useDispatch();
  const likeItems = useSelector((state) => state.like.likesData);

  useEffect(() => {
    dispatch(initLikeDataFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const today = new Date().toISOString().split('T')[0];
    const saved = JSON.parse(localStorage.getItem('productOfTheDay'));

    if (saved && saved.date === today && saved.product) {
      // На всякий случай дожимаем нормализацию (вдруг старые данные без id)
      const normalized = ensureProductShape(saved.product);
      setProductOfTheDay(normalized);
      return;
    }

    // Выбираем товар, нормализуем к общей схеме
    const seed = new Date(today).getTime();
    const randomIndex = getSeededRandomIndex(seed, data.length);
    const picked = data[randomIndex];

    const normalized = ensureProductShape({
      ...picked,
      // «товар дня» продаётся с -50% — даём правильное поле под карточки
      discont_price:
        picked?.discont_price ??
        picked?.discountPrice ??
        Math.round((Number(picked?.price) || 0) / 2),
    });

    // Абсолютный URL картинки, если пришёл относительный
    normalized.image = resolveProductImageUrl(normalized.image);

    setProductOfTheDay(normalized);
    localStorage.setItem(
      'productOfTheDay',
      JSON.stringify({ date: today, product: normalized })
    );
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!productOfTheDay) return <div>No product available</div>;

  const { image, title, price, discont_price, id } = productOfTheDay;
  const discountPercentage = 50;
  const imageUrl = `${image}`;

  const isItLiked = likeItems.some((likeItem) => likeItem.id === id);

  const handleLike = () => {
    if (!productOfTheDay) return;
    if (isItLiked) {
      dispatch(removeLikeProductbyIdFromCart(id));
    } else {
      // в избранные тоже кладём нормализованный товар
      dispatch(addToWishlist(productOfTheDay));
    }
  };

  const handleCart = () => {
    // в корзину кладём НОРМАЛИЗОВАННЫЙ товар; в слайсе будет корректный id
    dispatch(addToCartByAmount({ ...productOfTheDay, count: 1 }));
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
            className={`${styles.heartBtn} ${isItLiked ? styles.icons_active : ''}`}
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
