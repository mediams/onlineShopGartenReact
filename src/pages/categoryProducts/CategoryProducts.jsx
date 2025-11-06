import { useParams } from 'react-router-dom';
import useFetchCategoryId from '../../utils/useFetchCategoryId';
import ProductsList from '../../components/productsList/ProductsList';
import Filter from '../../components/filter/Filter';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';

export default function CategoryProducts() {
  const { id } = useParams();
  const { category, data, loading, error } = useFetchCategoryId(id);

  return (
    <section>
      <Container>
        <BreadCrumbs />
        <SectionTitle>{category?.name ?? category?.title ?? 'Category'}</SectionTitle>
        <Filter />

        {loading && <div>Loading...</div>}
        {error && !loading && <div>Error: {error}</div>}
        {!loading && !error && <ProductsList data={data} />}
      </Container>
    </section>
  );
}
