import styles from './SectionTitle.module.scss';

export default function SectionTitle({ children, className = "" }) {
  return <h2 className={`${styles.sectionTitle} ${className}`}>{children}</h2>;
}
