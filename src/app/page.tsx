import PageLayout from "@/components/PageLayout";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Home | trustpkg.dev",
};

export default function Home() {
  return <PageLayout NavigationSlot={<Navigation />}></PageLayout>;
}
