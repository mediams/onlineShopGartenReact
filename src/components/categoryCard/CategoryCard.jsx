import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../utils/fetchClient';
import { BASE_BACKEND_URL } from '../../utils/env';
import styles from './CategoryCard.module.scss';
import ButtonLink from '../ui/ButtonLink';
const CategoryCard = ({ limit, onCategoriesPage }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!categories || categories.length === 0)
    return <div>No categories available.</div>;

  return (
    <>
      <div
        className={
          onCategoriesPage ? styles.onCategoriesPage : styles.onHomePage
        }
      >
        {categories.slice(0, limit).map((item) => (
          <Link key={item.id} to={`/categories/${item.id}`}>
            <div className={styles.itemWrapper}>
              <div className={styles.imageContainer}>
                <img
                  src={`${BASE_BACKEND_URL}${item.image}`}
                  alt={`Category ${item.title}`}
                  className={styles.categoriesImage}
                />
              </div>
            </div>
            <div className={styles.categoriesTitle}>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <ButtonLink
        to="/categories"
        text="Categories"
        className={`${styles.onHomePage_button__outlined} ${styles.onHomePage_button__outlined_inTitle}`}
      />
    </>
  );
};

export default CategoryCard;
