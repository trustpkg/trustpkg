import {
  getChartTickPositions,
  getLastMonths,
} from "../../PackageList.utils";
import styles from "../../PackageList.module.scss";

const chartMonths = getLastMonths(6);
const chartPositions = getChartTickPositions(chartMonths.length).map(
  (position) => `${position}%`,
);

export function PackageListChartSkeleton() {
  return (
    <div className={styles.chartSkeleton} aria-hidden="true">
      <div className={styles.chartSkeleton_axis} />

      <div className={styles.chartSkeleton_content}>
        {chartPositions.map((left, index) => (
          <span
            key={`label-${index}`}
            className={styles.chartSkeleton_month}
            style={{ left }}
          >
            {chartMonths[index].label}
          </span>
        ))}
      </div>
    </div>
  );
}
