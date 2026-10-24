import styles from "./VulnerabilitiesTable.module.scss";

const SKELETON_ROWS = 5;

export function VulnerabilitiesTableSkeleton() {
  return (
    <div className={styles.vulnerabilitiesTable} aria-hidden="true">
      <div className={styles.vulnerabilitiesTable_header}>
        <div className={styles.vulnerabilitiesTable_skeletonHeading}>
          <span className={`${styles.vulnerabilitiesTable_skeleton} ${styles.vulnerabilitiesTable_skeletonTitle}`} />
          <span className={`${styles.vulnerabilitiesTable_skeleton} ${styles.vulnerabilitiesTable_skeletonSubtitle}`} />
        </div>

        <div className={styles.vulnerabilitiesTable_controls}>
          <span className={`${styles.vulnerabilitiesTable_skeleton} ${styles.vulnerabilitiesTable_skeletonControl}`} />
          <span className={`${styles.vulnerabilitiesTable_skeleton} ${styles.vulnerabilitiesTable_skeletonControl}`} />
        </div>
      </div>

      <div className={styles.vulnerabilitiesTable_skeletonRows}>
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <span key={index} className={`${styles.vulnerabilitiesTable_skeleton} ${styles.vulnerabilitiesTable_skeletonRow}`} />
        ))}
      </div>
    </div>
  );
}
