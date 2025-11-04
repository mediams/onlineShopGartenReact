import React, { useEffect } from 'react';
import { Menu } from 'lucide-react';
import Container from '../container/Container';
import NavMenu from '../navMenu/NavMenu';
import ButtonLink from '../ui/ButtonLink';
import { Link } from 'react-router-dom';
import LogoThemeBlock from '../logoThemeBlock/LogoThemeBlock';
import styles from './Header.module.scss';
import { useModal } from '../../context/ModalContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { initLikeDataFromLocalStorage } from '../../store/slices/likeSlice';
import { useDialog } from '../../context/DialogContect';
import ProductOfTheDayCard from '../productOfTheDayCard/ProductOfTheDayCard';

export default function Header() {
  const { isMobile, setModalOpen } = useModal();
  const {openDialog} = useDialog()
  const likes = useSelector((state) => state.like.likesData);
  const cartCounter = useSelector((state) => state.cart.cartData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initLikeDataFromLocalStorage());
  }, []);
  const handleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const handleDialog = ()=>{openDialog("type2", <ProductOfTheDayCard/>)}
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerWrapper}>
          <LogoThemeBlock />
          {!isMobile && (
            <div className={styles.navWrapper}>
              <ButtonLink
               onClick={handleDialog}
                text="1 day discount"
                className={styles.discountBtn}
                type="button"
              />
              <NavMenu />
            </div>
          )}

          <div className={styles.icons}>
            <Link to="/likes">
              <Heart className={styles.svgLink} />
              {likes.length > 0 ? (
                <span className={styles.сounter}>{likes.length}</span>
              ) : null}
            </Link>
            <Link to="/cart">
              <ShoppingBag className={styles.svgLink}/>
              {cartCounter.length > 0 ? (
                <span className={styles.сounter}>{cartCounter.length}</span>
              ) : null}
            </Link>
            {isMobile && (
              <button
                className={`button ${styles.burgerBtn}`}
                onClick={handleModal}
              >
                <Menu className={styles.svgBtn} />
              </button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
