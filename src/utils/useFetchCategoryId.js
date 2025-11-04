import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategoryId } from '../store/slices/productSlice';
import { fetchProductsByCategoryId } from './fetchClient';

const useFetchCategoryId = (id) => {
  const dispatch = useDispatch();
  const { category, data } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(setSelectedCategoryId(id));
    dispatch(fetchProductsByCategoryId(id));
  }, [id]);
  return { category, data };
};
export default useFetchCategoryId;
