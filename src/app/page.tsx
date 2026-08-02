import PageLayout from "@/components/PageLayout";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/Button";

export const metadata = {
  title: "Home | trustpkg.dev",
};

export default function Home() {
  return (
    <PageLayout NavigationSlot={<Navigation />}>
      <Button.AsAnchor>test test</Button.AsAnchor>
    </PageLayout>
  );
}
