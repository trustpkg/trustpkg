import { PackageListRoot } from "./PackageList";
import {
  PackageListItem,
  PackageListItemSkeleton,
} from "./PackageList.client";

interface PackageListComponent {
  Item: typeof PackageListItem;
  ItemSkeleton: typeof PackageListItemSkeleton;
}

const PackageList = PackageListRoot as typeof PackageListRoot &
  PackageListComponent;

PackageList.Item = PackageListItem;
PackageList.ItemSkeleton = PackageListItemSkeleton;

export default PackageList;
