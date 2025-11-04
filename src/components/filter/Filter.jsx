import React, { useState } from 'react';
import Checkbox from '../ui/Checkbox';
import styles from './Filter.module.scss';
import Select from '../select/Select';
import Input from '../ui/Input';

import { useDispatch, useSelector } from 'react-redux';
import {
  setIsDiscounted,
  setPriceFrom,
  setPriceTo,
  setSortBy,
} from '../../store/slices/filtersSlice';

export default function Filter() {
  const dispatch = useDispatch();
  const { priceFrom, priceTo, isDiscounted, sortBy } = useSelector(
    (state) => state.filters
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'from') {
      dispatch(setPriceFrom(value ? Number(value) : ''));
    } else if (name === 'to') {
      dispatch(setPriceTo(value ? Number(value) : ''));
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    dispatch(setIsDiscounted(checked));
  };

  const handleSortChange = (value) => {
    dispatch(setSortBy(value));
  };

  return (
    <form className={styles.formContainer}>
      <div className={styles.container}>
        <p className={styles.label}>Price</p>
        <label htmlFor={'from'} className={styles.label}></label>
        <Input
          name="from"
          id="from"
          value={priceFrom}
          onChange={handleChange}
          placeholder="from"
          className={styles.inputField}
        />
        <label htmlFor={'to'} className={styles.label}></label>
        <Input
          name="to"
          id="to"
          value={priceTo}
          onChange={handleChange}
          placeholder="to"
          className={styles.inputField}
        />
      </div>
      <div className={styles.container}>
        <label htmlFor={'isDiscounted'} className={styles.label}>
          Discounted items
        </label>

        <Checkbox
          name="isDiscounted"
          id="isDiscounted"
          checked={isDiscounted}
          onChange={handleCheckboxChange}
          className={styles.checkboxInput}
        />
      </div>
      <div className={styles.container}>
        <label htmlFor={'sortBy'} className={styles.label}>
          Selected
        </label>
        <Select value={sortBy} onChange={handleSortChange} />
      </div>
    </form>
  );
}
