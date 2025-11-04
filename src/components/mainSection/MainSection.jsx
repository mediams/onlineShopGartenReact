import React from 'react';
import styles from './MainSection.module.scss';
import ButtonLink from '../ui/ButtonLink';
import Container from '../container/Container';

export default function MainSection() {


  return (
    <section className={styles.section}>
      <div className={styles.imageContainer}>
        <Container>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Amazing Discounts on Garden Products!
            </h1>
            <ButtonLink
              to="/cart"
              className={styles.heroBtn}
              text={'Check out'}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
