import Navigation from "@/components/Navigation";
import PageLayout from "@/components/PageLayout";
import type { NavigationItem } from "@/components/Navigation/Navigation.types";

export const metadata = {
  title: "Home | trustpkg.dev",
};

export default function Home() {
  return <PageLayout NavigationSlot={<Navigation />} />;
}
