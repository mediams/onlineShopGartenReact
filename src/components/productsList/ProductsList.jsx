import React, { useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router';
import styles from './ProductsList.module.scss';
import SaleCard from '../saleCard/SaleCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeAllProductbyIdFromCart,
  initDataFromLocalStorage,
} from '../../store/slices/cartSlice';
import {
  addToWishlist,
  removeLikeProductbyIdFromCart,
  initLikeDataFromLocalStorage,
} from '../../store/slices/likeSlice';
import Skeleton from '../skeleton/Skeleton';

export default function ProductsList({ data, loading, error, path = '' }) {
  const { isDarkTheme } = useTheme();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.cartData);
  const likeItems = useSelector((state) => state.like.likesData);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(initDataFromLocalStorage());
    dispatch(initLikeDataFromLocalStorage());
  }, []);

  const handleClickIcons = useCallback(
    (type, item) => {
      if (type === 'heart') {
        let isItLiked = likeItems.some((likeItems) => likeItems.id === item.id);
        if (isItLiked) {
          dispatch(removeLikeProductbyIdFromCart(item.id));
        } else {
          dispatch(addToWishlist(item));
        }
      } else if (type === 'cart') {
        const pid = item.id ?? item.productId ?? item._id;
        const price = Number(item.price) || 0;
        const discont = Number(item.discont_price) || 0;
        const isInCart = items.some((ci) => (ci.id ?? ci.productId ?? ci._id) === pid);
        if (isInCart) {
          dispatch(removeAllProductbyIdFromCart(pid));
        } else {
          dispatch(addToCart({
            ...item,
            id: pid,
            price,                 // исходная цена ЧИСЛОМ
            discont_price: discont // цена со скидкой (0 если нет скидки)
          }));
        }
      }
    },
    [items, likeItems]
  );

  const getActualPrice = (item) => {
    return item.discont_price > 0 ? item.discont_price : item.price;
  };

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    let filtered = data.filter((item) => {
      const priceFrom = filters.priceFrom ? Number(filters.priceFrom) : null;
      const priceTo = filters.priceTo ? Number(filters.priceTo) : null;

      const isDiscounted = filters.isDiscounted ? item.discont_price > 0 : true;
      const matchesPrice =
        (!priceFrom || getActualPrice(item) >= priceFrom) &&
        (!priceTo || getActualPrice(item) <= priceTo);

      return matchesPrice && isDiscounted;
    });

    return [...filtered].sort((a, b) => {
      if (filters.sortBy === 'by default') {
        return 0;
      } else if (filters.sortBy === 'price: low-high') {
        return getActualPrice(a) - getActualPrice(b);
      } else if (filters.sortBy === 'price: high-low') {
        return getActualPrice(b) - getActualPrice(a);
      } else if (filters.sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (filters.sortBy === 'by default') {
        return data;
      }
      return 0;
    });
  }, [data, filters]);
  if (loading) {
    return (
      <div className={styles.cardsContainer}>
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.cardsContainer}>
      {filteredData.length > 0 ? (
        filteredData.map((item) => {
          const pid = item.id ?? item.productId ?? item._id;
          let isInCart  = items.some(ci  => (ci.id  ?? ci.productId ?? ci._id) === pid);
          let isInLikes = likeItems.some(li => (li.id ?? li.productId ?? li._id) === pid);

          return (
            <div key={pid} className={styles.wrapperLink}>
              <div
                className={` ${styles.icons} ${isDarkTheme ? styles.icons_dark : styles.icons_light}`}
              >
                <button
                  name="heart"
                  className={` ${isInLikes ? styles.icons_active : ''}  `}
                 onClick={(e) =>
                  handleClickIcons(e.currentTarget.name, { ...item, id: pid })
                }
                >
                  <Heart className={styles.svgLink} />
                </button>
                <button
                  name="cart"
                  className={` ${isInCart ? styles.icons_active : ''}`}
                  onClick={(e) =>
                    handleClickIcons(e.currentTarget.name, { ...item, id: pid })
                  }
                >
                  <ShoppingBag className={styles.svgLink} />
                </button>
              </div>
              <Link to={`/products/${pid}`}>
                <SaleCard
                  id={pid}
                  price={item.price}
                  title={item.title}
                  image={item.image}
                  discont_price={item.discont_price}
                />
              </Link>
            </div>
          );
        })
      ) : (
        <h2>No items found</h2>
      )}
    </div>
  );
}
