import { SeverityCard } from "./severityCard";
import { SeverityCardGroupProps } from "./severityCard.types";
import styles from "./severityCardGroup.module.scss";

export function SeverityCardGroup(props: SeverityCardGroupProps) {
  const { items } = props;

  return (
    <ul className={styles.severityCardGroup} aria-label="Vulnerabilities by severity">
      {items.map((item) => (
        <li key={item.severity} className={styles.severityCardGroup_item}>
          <SeverityCard {...item} />
        </li>
      ))}
    </ul>
  );
}
