
import ProductsList from '../../components/productsList/ProductsList';
import Filter from '../../components/filter/Filter';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initLikeDataFromLocalStorage } from '../../store/slices/likeSlice';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
import styles from "./Likes.module.scss"

export default function Likes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initLikeDataFromLocalStorage());
  }, []);
  const data = useSelector((state) => state.like.likesData);
  return (
    <section>
      <Container>
        <BreadCrumbs />
        <SectionTitle>Liked products</SectionTitle>
        <Filter />
        {data.length === 0 
        ?  <div className={styles.emptyContainer}>No liked products</div>
        :  <ProductsList data={data} />}
        
      </Container>
    </section>
  );
}
