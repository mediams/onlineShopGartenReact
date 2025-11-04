import React from 'react';
import SectionTitle from '../sectionTitle/SectionTitle';
import ButtonLink from '../ui/ButtonLink';
import styles from './mainSectionTitle.module.scss';
export default function MainSectionTitle({ title, to, text }) {
  return (
    <div className={styles.sectionTitle}>
      <div className={`${styles.sectionTitle_titleBlock}`}>
        <SectionTitle>{title}</SectionTitle>
        <span className={styles.sectionTitle_titleLine}></span>
        <ButtonLink
          to={to}
          text={text}
          className={`${styles.sectionTitle_button__outlined} ${styles.sectionTitle_button__outlined_inTitle}`}
        />
      </div>
    </div>
  );
}
