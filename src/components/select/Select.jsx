import React, { useState } from 'react';
import styles from './Select.module.scss';
import { ChevronDown } from 'lucide-react';

const Select = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectContainer} id="sortBy">
      <div className={styles.selectBox} onClick={toggleSelect}>
        <span className={styles.selectText}>{value || 'by default'}</span>
        <span className={`${styles.selectArrow} ${isOpen ? styles.open : ''}`}>
          <ChevronDown size="20" color=" #424436" />
        </span>
      </div>

      {isOpen && (
        <ul className={styles.selectDropdown}>
          <li onClick={() => handleOptionSelect('by default')}>by default</li>
          <li onClick={() => handleOptionSelect('newest')}>newest</li>
          <li onClick={() => handleOptionSelect('price: high-low')}>
            price: high-low
          </li>
          <li onClick={() => handleOptionSelect('price: low-high')}>
            price: low-high
          </li>
        </ul>
      )}
    </div>
  );
};

export default Select;
