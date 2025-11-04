import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './fetchClient';
import { setSelectedCategoryId } from '../store/slices/productSlice';

const useFetchProducts = (type) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (type === 'all') {
      dispatch(setSelectedCategoryId(null));
      dispatch(fetchProducts('all'));
    } else {
      dispatch(setSelectedCategoryId(null));
      dispatch(fetchProducts('sale'));
    }
  }, []);
  return { data, loading, error };
};
export default useFetchProducts;
