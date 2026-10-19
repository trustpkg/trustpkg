import styles from "./SeverityTrendChart.module.scss";

const SKELETON_ROWS = 4;

export function SeverityTrendChartSkeleton() {
  return (
    <div className={styles.severityTrendChart} aria-hidden="true">
      <span className={`${styles.severityTrendChart_skeleton} ${styles.severityTrendChart_skeletonTitle}`} />

      <span className={`${styles.severityTrendChart_skeleton} ${styles.severityTrendChart_skeletonGraph}`} />

      <div className={styles.severityTrendChart_skeletonList}>
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <span key={index} className={`${styles.severityTrendChart_skeleton} ${styles.severityTrendChart_skeletonRow}`} />
        ))}
      </div>
    </div>
  );
}
