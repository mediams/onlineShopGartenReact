import ContentLoader from "react-content-loader"
import styles from './Skeleton.module.scss';

const skeleton = (props) => (
  <div className={styles.skeletonContainer}>
      <ContentLoader
        speed={2}
        width="100%"
        height="100%"
        viewBox="0 0 316 422" 
        backgroundColor="#f2f6d3"
        foregroundColor="#92a134"
        preserveAspectRatio="xMidYMid meet" 
        {...props}
      >
        <rect x="0" y="0" rx="12" ry="12" width="316" height="422" />
      </ContentLoader>
    </div>
)

export default skeleton

