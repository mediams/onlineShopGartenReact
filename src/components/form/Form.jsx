import React, { useState } from 'react';
import { ShieldX } from 'lucide-react';
import { useForm } from 'react-hook-form';
import styles from './Form.module.scss';
import { useDialog } from '../../context/DialogContect';
import { removeAllItemsFromCart } from '../../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
export default function Form({ type }) {
  const dispatch = useDispatch();
  const { openDialog } = useDialog();
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(() => {
    const savedMessage = localStorage.getItem('isSuccessMessage');
    return savedMessage ? JSON.parse(savedMessage) : false;
  });

  const stylesForm = type === 'discount' ? styles.discount : styles.order;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    onError,
  } = useForm();

  const onSubmit = (data) => {
    if (type === 'discount') {
      console.log('discount', data);
      setSuccessMessage('The discount has been successfully sent by email');
      setIsSuccessMessage((prev) => {
        const newDiscount = !prev;
        localStorage.setItem('isSuccessMessage', JSON.stringify(newDiscount));
        return newDiscount;
      });
    } else {
      dispatch(removeAllItemsFromCart());
      openDialog(
        'type3',
        <span>A manager will contact you shortly to confirm your order.</span>
      );
    }
    reset();
  };
  const buttonClassName = isSuccessMessage
    ? styles.form_button_disable
    : styles.form_button;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} className={stylesForm}>
        <input
          disabled={type === 'discount' && isSuccessMessage}
          className={styles.form_inputs}
          placeholder="Name"
          type="text"
          {...register('name', {
            required: 'Please, type your name!',
            minLength: {
              value: 3,
              message: 'Too short!',
            },
            maxLength: {
              value: 12,
              message: 'Too long!',
            },
          })}
        />
        <input
          disabled={type === 'discount' && isSuccessMessage}
          className={styles.form_inputs}
          placeholder="Phone number"
          type="tel"
          {...register('phone', {
            required: 'Please, type your phone!',
            pattern: {
              value: /^\d{9,15}$/,
              message:
                'Phone number must contain 9-15 digits and no spaces or hyphens',
            },
          })}
        />

        <input
          disabled={type === 'discount' && isSuccessMessage}
          className={styles.form_inputs}
          placeholder="Email"
          type="email"
          {...register('email', {
            required: 'Please, enter your email!',
            pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
          })}
        />
        {errors.name && (
          <p className={styles.error}>
            <ShieldX size={20} className={styles.error_icon} />
            {errors.name.message}
          </p>
        )}
        {errors.phone && (
          <p className={styles.error}>
            <ShieldX size={20} className={styles.error_icon} />
            {errors.phone.message}
          </p>
        )}
        {errors.email && (
          <p className={styles.error}>
            <ShieldX size={20} className={styles.error_icon} />
            {errors.email.message}
          </p>
        )}

        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <div className={styles.form_buttonWrapper}>
          {type === 'order' ? (
            <button type="submit" className={styles.form_button}>
              Order
            </button>
          ) : (
            <button
              type="submit"
              className={buttonClassName}
              disabled={isSuccessMessage}
            >
              {isSuccessMessage
                ? 'The discount has been received'
                : 'Get Discount'}
            </button>
          )}
        </div>
      </form>
    </>
  );
}
