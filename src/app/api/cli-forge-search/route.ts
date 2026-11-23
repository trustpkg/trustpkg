import { cliForgeSource } from "@/lib/cliForgeDocs";
import { createFromSource } from "fumadocs-core/search/server";

export const dynamic = "force-static";

export const { staticGET: GET } = createFromSource(cliForgeSource, {
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: page.slugs[0],
    };
  },
});
