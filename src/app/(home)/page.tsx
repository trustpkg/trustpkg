import React from "react";
import { ListPackagesParametersSchema } from "@/api/parameters";
import {
  normalizeSearchParams,
  type SearchParams,
} from "@/utils/normalizeSearchParams";
import Navigation from "@/components/Navigation";
import PageLayout from "@/components/PageLayout";
import { EcosystemsSection } from "./components/EcosystemsSection";
import { HomeHero } from "./components/HomeHero";
import { PopularPackagesHeader } from "./components/PopularPackages/PopularPackagesHeader";
import { PopularPackagesSection } from "./components/PopularPackages/PopularPackagesSection";
import { PopularPackagesSectionSkeleton } from "./components/PopularPackages/PopularPackagesSectionSkeleton";
import { SecuritySection } from "./components/Security/SecuritySection";

export const metadata = {
  title: "Home | trustpkg.dev",
  description:
    "trustpkg.dev is a platform that provides vulnerability frequency, insight and comparison of packages. ",
};

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home(props: PageProps) {
  const rawQueryParams = await props.searchParams;
  const queryParams = normalizeSearchParams(rawQueryParams, ["page", "limit"]);

  const resolvedParams = ListPackagesParametersSchema.safeParse(queryParams);

  if (!resolvedParams.success) {
    throw new Error(
      "Invalid query parameters." + JSON.stringify(resolvedParams.error),
    );
  }

  return (
    <PageLayout NavigationSlot={<Navigation />}>
      <PageLayout.Overview>
        <PageLayout.Overview.MainColumn>
          <HomeHero />

          <PageLayout.Overview.CommonSection
            borderVariant="none"
            paddingVariant="small"
            id="first-section"
          >
            <PopularPackagesHeader />

            <React.Suspense
              fallback={
                <PopularPackagesSectionSkeleton
                  currentPage={resolvedParams.data.page}
                />
              }
            >
              <PopularPackagesSection params={resolvedParams.data} />
            </React.Suspense>
          </PageLayout.Overview.CommonSection>
        </PageLayout.Overview.MainColumn>

        <PageLayout.Overview.SideColumn>
          <EcosystemsSection />
          <SecuritySection />
        </PageLayout.Overview.SideColumn>
      </PageLayout.Overview>
    </PageLayout>
  );
}