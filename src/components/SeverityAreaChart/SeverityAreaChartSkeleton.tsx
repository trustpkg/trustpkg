import styles from "./SeverityAreaChart.module.scss";

const SKELETON_ROWS = 4;

export function SeverityAreaChartSkeleton() {
  return (
    <div className={styles.severityAreaChart} aria-hidden="true">
      <span className={`${styles.severityAreaChart_skeleton} ${styles.severityAreaChart_skeletonTitle}`} />
      <span className={`${styles.severityAreaChart_skeleton} ${styles.severityAreaChart_skeletonGraph}`} />

      <div className={styles.severityAreaChart_skeletonList}>
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <span key={index} className={`${styles.severityAreaChart_skeleton} ${styles.severityAreaChart_skeletonRow}`} />
        ))}
      </div>
    </div>
  );
}
