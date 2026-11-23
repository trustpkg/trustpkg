import { Base } from "@/components/Base/Base";
import PageLayout from "@/components/PageLayout";
import { cliForgeLatestVersion } from "@/lib/cliForgeDocs";
import { redirect } from "next/navigation";

export default function CliForgePage() {
    if (cliForgeLatestVersion) {
        redirect(`/tools/trustpkg-cli-forge/${cliForgeLatestVersion.version}/`);
    }

    return (
        <PageLayout>
            <Base as="h1">CLI Forge documentation</Base>
            <Base as="p">No released documentation is available yet.</Base>
        </PageLayout>
    );
}
