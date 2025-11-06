import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '../../components/container/Container';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import Filter from '../../components/filter/Filter';
import ProductsList from '../../components/productsList/ProductsList';
import useFetchCategoryId from '../../utils/useFetchCategoryId';

const CategoryProducts = () => {
  const { id } = useParams();
  const { category, data, loading, error } = useFetchCategoryId(id);

  // 1) сначала берём имя из стора products.category (мы его нормализовали в slice)
  const titleFromProductsSlice =
    (category && (category.name || category.title)) || null;

  // 2) если есть общий список категорий — пытаемся найти там
  const categoriesList = useSelector((s) => s.categories?.data || []);
  const foundInList = categoriesList.find((c) => String(c.id) === String(id));
  const titleFromCategoriesSlice =
    foundInList?.name || foundInList?.title || null;

  // 3) запасной вариант — вдруг у товара внутри лежит категория строкой/объектом
  const first = Array.isArray(data) && data.length > 0 ? data[0] : null;
  const titleFromFirstProduct =
    first?.category?.name ||
    first?.category?.title ||
    (typeof first?.category === 'string' ? first.category : null) ||
    null;

  const categoryTitle =
    titleFromProductsSlice ||
    titleFromCategoriesSlice ||
    titleFromFirstProduct ||
    `Category #${id}`;

  return (
    <section>
      <Container>
        <BreadCrumbs currentTitle={categoryTitle} />
        <SectionTitle>{categoryTitle}</SectionTitle>

        <Filter />

        {loading && <div>Loading...</div>}
        {error && !loading && <div>Error: {error}</div>}
        {!loading && !error && <ProductsList data={data} />}
      </Container>
    </section>
  );
};

export default CategoryProducts;
