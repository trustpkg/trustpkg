import { loader } from "fumadocs-core/source";
import { defineDocs } from "fumadocs-mdx/macro";
import versions from "../../.generated/cli-forge-versions.json";

const docs = defineDocs({ dir: ".generated/cli-forge" });

export const cliForgeSource = loader({
  baseUrl: "/tools/trustpkg-cli-forge",
  source: docs.toFumadocsSource(),
});

export const cliForgeVersions = versions;
export const cliForgeLatestVersion = cliForgeVersions[0];
