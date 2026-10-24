import { VulnerabilitiesTableClient } from "./VulnerabilitiesTable.client";
import { VulnerabilitiesTableProps } from "./VulnerabilitiesTable.types";
import { toRows } from "./VulnerabilitiesTable.utils";

export function VulnerabilitiesTable(props: VulnerabilitiesTableProps) {
  const { vulnerabilities, packageName } = props;

  return <VulnerabilitiesTableClient rows={toRows(vulnerabilities)} packageName={packageName} />;
}
