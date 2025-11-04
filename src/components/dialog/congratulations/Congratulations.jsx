import React from 'react';
import { X } from 'lucide-react';
import styles from './Congratulations.module.scss';
export default function Congratulations({ dialogContent, handleDialog }) {
  return (
    <dialog open>
      <div className={styles.congratulations}>
        <div className={styles.closeBtnWrapper}>
          <button
            className={`button ${styles.closeBtn}`}
            onClick={handleDialog}
          >
            <X className={styles.svgBtn} />
          </button>
        </div>
        <div>
          <h2 className={styles.congratulations_title}>Congratulations! </h2>
          <div className={styles.congratulations_block}>
            <p className={styles.congratulations_text}>
              Your order has been successfully placed on the website.
            </p>
            <p className={styles.congratulations_text}>{dialogContent}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
