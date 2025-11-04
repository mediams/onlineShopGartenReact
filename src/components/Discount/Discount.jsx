import React, { useContext, useState } from 'react';
import styles from './Discount.module.scss';
import discountFormBackImg from '../../assets/img/background.png';
import Container from '../container/Container.jsx';
import Form from '../form/Form.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const Discount = () => {
  const { isDarkTheme } = useTheme();

  const onFormSubmit = (formData) => {
    setDiscountStatus(true);
  };
  return (
    <section>
      <Container>
        <div className={styles.discountForm}>
          <div className={styles.discountFormText}>
            <h2>5% off on the first order</h2>
          </div>
          <div className={styles.discountFormInfoWrapper}>
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src="media/background.png"
                alt="garten tools"
              />
            </div>
            <div className={styles.formWrapper}>
              <Form type="discount" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Discount;
