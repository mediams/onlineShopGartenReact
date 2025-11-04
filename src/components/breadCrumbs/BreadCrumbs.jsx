import {Link, useLocation} from "react-router";
import styles from "./BreadCrumbs.module.scss";
import {useEffect, useMemo, useState} from "react";
import {getCategoryById, getProductById} from "../../utils/fetchClient";
import classNames from "classnames";

export default function BreadCrumbs() {
  const body = document.querySelector('body');
  console.log(body.classList[0]);
  const location = useLocation();
  const wayArray = useMemo(() => location.pathname.split("/").slice(1), [location]);
  const [way, setWay] = useState({
    place: wayArray[0],
    catId: '',
    prodId: '',
  });

  const [placeName, setPlaceName] = useState(null);
  
  useEffect(() => {
    switch (way.place) {
      case 'categories':
        setPlaceName('Categories');
        if(wayArray[2]) {
          getProductById(wayArray[2]).then(res => {
            setWay((prev) => ({...prev, prodId: res[0].title}))
          });
        }

        if (wayArray[1]) {
          getCategoryById(wayArray[1]).then((res) => {
            setWay((prev) => ({ ...prev, catId: res.category.title }));
          });
        }
        break;
      case 'products':
        setPlaceName('All products');
        if(wayArray[1]) {
          getProductById(wayArray[1]).then((res) => {
            setWay((prev) => ({ ...prev, prodId: res[0].title }));
          });
        }

        break;
      case 'sale':
        setPlaceName('All sales');
        if (wayArray[1]) {
          getProductById(wayArray[1]).then((res) => {
            setWay((prev) => ({ ...prev, prodId: res[0].title }));
          });
        }
        break;
      case 'likes':
        setPlaceName('Liked products');
        if (wayArray[1]) {
          getProductById(wayArray[1]).then((res) => {
            setWay((prev) => ({ ...prev, prodId: res[0].title }));
          });
        }
        break;
      default:
        console.log('other!');
    }

  }, [wayArray])

  useEffect(() => {

  }, [])

  return (
    <div className={styles.bread_crumbs}>
      {way.place && (
        <Link
          to="/"
          className={`${styles.bread_crumbs__link} bread_crumbs__link`}
        >
          Home Page
        </Link>
      )}

      {way.catId || way.prodId ? (
        <Link
          to={`/${way.place}`}
          className={`${styles.bread_crumbs__link} bread_crumbs__link`}
        >
          {placeName}
        </Link>
      ) : (
        <span
          className={classNames(
            `${styles.bread_crumbs__link} bread_crumbs__link`,
            {
              [styles.dark]: body.classList.contains('dark'),
            }
          )}
        >
          {placeName}
        </span>
      )}

      {way.catId && way.prodId && (
        <Link
          to={`/categories/${wayArray[1]}`}
          className={styles.bread_crumbs__link}
        >
          {way.catId}
        </Link>
      )}

      {way.catId && !way.prodId && (
        <span className={`${styles.bread_crumbs__link} bread_crumbs__link`}>
          {way.catId}
        </span>
      )}

      {way.prodId && (
        <span className={`${styles.bread_crumbs__link} bread_crumbs__link`}>
          {way.prodId}
        </span>
      )}
    </div>
  );
}