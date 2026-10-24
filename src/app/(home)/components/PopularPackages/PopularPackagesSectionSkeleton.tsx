import PackageList from "@/components/PackageList";

interface PopularPackagesSectionSkeletonProps {
  currentPage?: number;
}

export function PopularPackagesSectionSkeleton(
  props: PopularPackagesSectionSkeletonProps,
) {
  const { currentPage } = props;

  return (
    <PackageList count={0} currentPage={currentPage}>
      {Array.from({ length: 9 }, (_, index) => (
        <PackageList.ItemSkeleton
          key={`package-skeleton-${index}`}
          IsAlternating={index % 2 === 1}
        />
      ))}
    </PackageList>
  );
}
