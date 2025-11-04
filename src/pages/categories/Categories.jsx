import React from 'react';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';

export default function Categories() {

  
  return (
    <Container>
      <BreadCrumbs />
      <SectionTitle>Categories</SectionTitle>
      <CategoryCard limit={5} onCategoriesPage={true} />
    </Container>
  );
}