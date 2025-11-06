import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategoryId } from '../store/slices/productSlice';
import { fetchProductsByCategoryId } from './fetchClient';

const useFetchCategoryId = (id) => {
  const dispatch = useDispatch();
  const { category, data, loading, error } = useSelector((s) => s.products);

  useEffect(() => {
    if (!id) return;
    dispatch(setSelectedCategoryId(id));
    dispatch(fetchProductsByCategoryId(id));
  }, [id, dispatch]);

  return { category, data, loading, error };
};

export default useFetchCategoryId;
