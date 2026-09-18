import { getPackagesFetch } from "@/api/getPackagesFetch";
import type { ListPackagesParameters } from "@/api/parameters";
import { toPackageListItem } from "@/components/PackageList/components/Item/PackageListItem.utils";
import PackageList from "@/components/PackageList";

interface PopularPackagesSectionProps {
  params: ListPackagesParameters;
}

export async function PopularPackagesSection(
  props: PopularPackagesSectionProps,
) {
  const { params } = props;
  const packagesList = await getPackagesFetch(params);

  return (
    <PackageList
      count={packagesList?.totalPages ?? 0}
      currentPage={params.page}
    >
      <PackageList.Items
        items={(packagesList?.documents ?? []).map(toPackageListItem)}
      >
        {(item, { isAlternating }) => (
          <PackageList.Item
            {...item}
            key={item.packageName}
            IsAlternating={isAlternating}
          />
        )}
      </PackageList.Items>
    </PackageList>
  );
}
