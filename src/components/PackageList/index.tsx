import {
  PackageListItems,
  PackageListRoot,
} from "./PackageList";
import {
  PackageListItem,
  PackageListItemSkeleton,
} from "./components/Item/PackageListItem";

interface PackageListComponent {
  Items: typeof PackageListItems;
  Item: typeof PackageListItem;
  ItemSkeleton: typeof PackageListItemSkeleton;
}

const PackageList = PackageListRoot as typeof PackageListRoot &
  PackageListComponent;

PackageList.Items = PackageListItems;
PackageList.Item = PackageListItem;
PackageList.ItemSkeleton = PackageListItemSkeleton;

export default PackageList;
