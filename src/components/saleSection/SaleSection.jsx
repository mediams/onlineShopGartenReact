import useFetchProducts from '../../utils/useFetchProducts';
import Container from '../container/Container';
import ProductsList from '../productsList/ProductsList';
import getRandomElements from '../../utils/randomMain';
import MainSectionTitle from '../mainSectionTitle/MainSectionTitle';
import styles from './SaleSection.module.scss';
import ButtonLink from '../ui/ButtonLink';
const SaleSection = () => {
  const { data, loading, error } = useFetchProducts('sale');
  const randomCards = getRandomElements(data).slice(0, 4);
  return (
    <section className={styles.section}>
      <Container>
        <MainSectionTitle title="Sale" to="/sale" text="All sales" />
        {error && <div>Error fetching data</div>}
        {loading && <div>Loading...</div>}
        {data && <ProductsList data={randomCards} path="sale/" />}
        <ButtonLink
          to="/sale"
          text="All sales"
          className={`${styles.section_button__outlined} ${styles.section_button__outlined_inTitle}`}
        />
      </Container>
    </section>
  );
};

export default SaleSection;
