import Navigation from "@/components/Navigation";
import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "Home | trustpkg.dev",
};

export default function Home() {
  return <PageLayout NavigationSlot={<Navigation />}></PageLayout>;
}
