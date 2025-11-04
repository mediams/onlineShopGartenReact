import React from 'react';
import useFetchProducts from '../../utils/useFetchProducts';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import ProductsList from '../../components/productsList/ProductsList';
import Filter from '../../components/filter/Filter';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
export default function Sale() {
  const { data, loading, error } = useFetchProducts('sale');

  return (
    <Container>
      <BreadCrumbs />
      <SectionTitle>Sale Products</SectionTitle>

      <Filter />
      <ProductsList data={data} loading={loading} error={error} />
    </Container>
  );
}
