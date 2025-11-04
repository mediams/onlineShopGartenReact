import React, { useEffect } from 'react';
import { fetchProductById } from './fetchClient';
import { useSelector, useDispatch } from 'react-redux';

const useFetchDetails = (productId) => {
  const dispatch = useDispatch();
  const { details, error, loading } = useSelector((state) => state.details);
  let id = Number(productId);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id]);
  return { details, error, loading };
};
export default useFetchDetails;
