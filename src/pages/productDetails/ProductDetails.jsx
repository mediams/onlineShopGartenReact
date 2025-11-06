import React from 'react';
import Container from '../../components/container/Container';
import ProductDetailsSection from '../../components/productDetailsSection/ProductDetailsSection';
import useFetchDetails from '../../utils/useFetchDetails';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
import styles from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { productId } = useParams();
  const { product, error, loading } = useFetchDetails(productId);

  return (
    <section className={styles.productDetails}>
      <Container>
        <BreadCrumbs />
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {product && (
          <ProductDetailsSection
            loading={loading}
            product={product}
            productId={product.id}
          />
        )}
      </Container>
    </section>
  );
};

export default ProductDetails;
