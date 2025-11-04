import React from "react";
import styles from "./ItemInCart.module.scss"
import { BASE_BACKEND_URL } from "../../utils/env";
import { X, Plus, Minus } from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";

import {
  removeItemFromCart,
  increaseCountInCartItem,
  decreaseCountInCartItem
} from '../../store/slices/cartSlice';
import {Link} from "react-router";

export default function ItemInCart({product}) {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);

  const handleRemoveItem = () => {
    const remove = cartData.find(item => item.id === +product.id);
    dispatch(removeItemFromCart(remove));
  }

  const handleIncreaseNuber = () => {
    const currEl = cartData.find(item => item.id === product.id).id;
    dispatch(increaseCountInCartItem(currEl));
  }

  const handleDecreaseNuber = () => {
    const currEl = cartData.find(item => item.id === product.id);
    if(currEl.count > 1) {
      dispatch(decreaseCountInCartItem(currEl.id));
    } else {
      dispatch(removeItemFromCart(currEl));
    }
    

  }

  return (
    <div className={styles.itemInCart}>
      <div className={styles.itemInCart_imageContainer}>
        <Link to={`/products/${product.id}`}>
          <img
            src={`${BASE_BACKEND_URL}${product.image}`}
            alt={product.title}
          />
        </Link>
      </div>
      <div className={styles.itemInCart_infoContainer}>
        <div className={styles.itemInCart_titleBox}>
          <h3>{product.title}</h3>
          <button onClick={handleRemoveItem}>
            <X size={28} color="black" />
          </button>
        </div>
        <div className={styles.itemInCart_infoSubBlock}>
          <div className={styles.itemInCart_amountBox}>
            <button onClick={handleDecreaseNuber}>
              <Minus size={24} />
            </button>
            <p>{product.count}</p>
            <button onClick={handleIncreaseNuber}>
              <Plus size={24} />
            </button>
          </div>
          <div className={styles.itemInCart_priceBox}>
            <p>
              ${product.discont_price ?? product.price}{' '}
              {product.discont_price && <span>${product.price}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}