import { PackageListRoot } from "./PackageList";
import { PackageListItem } from "./PackageList.client";

interface PackageListComponent {
  Item: typeof PackageListItem;
}

const PackageList = PackageListRoot as typeof PackageListRoot &
  PackageListComponent;

PackageList.Item = PackageListItem;

export default PackageList;
