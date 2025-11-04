import React from 'react';
import styles from './Discount.module.scss';
import { X } from 'lucide-react';

export default function Discount({ dialogContent, handleDialog  }) {
  return (
 <dialog open className={styles.dialog}>
 <div className={styles.discount}>
   <div className={styles.header}>
     <h2 className={styles.discountTitle}>
       50% discount on product of the day!
     </h2>
     <button className={styles.closeBtn} onClick={handleDialog}>
       <X className={styles.svgBtn} />
     </button>
   </div>
   <div className={styles.discountBlock}>{dialogContent}</div>
 </div>
 </dialog>
);
} 

