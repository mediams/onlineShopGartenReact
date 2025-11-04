import { useParams } from 'react-router-dom';
import useFetchCategoryId from '../../utils/useFetchCategoryId';
import ProductsList from '../../components/productsList/ProductsList';
import Filter from '../../components/filter/Filter';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import { useTheme } from '../../context/ThemeContext';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
export default function CategoryProducts() {
  const { isDarkTheme } = useTheme();
  const { id } = useParams();
  const { category, data } = useFetchCategoryId(id);
  console.log(data);
  return (
    <section>
      <Container>
        <BreadCrumbs />
        <SectionTitle>{category.title}</SectionTitle>

        <Filter />
        <ProductsList data={data} />
      </Container>
    </section>
  );
}
