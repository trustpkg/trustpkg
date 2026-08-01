import "server-only";

import { primaryTheme } from "@/theme/generated/themes.generated.const";
import type { CurrentTheme } from "@/theme/generated/themes.generated.types";
import { ApiClient } from "@/utils/api";
import { cookies } from "next/headers";

function resolveDomainUrl(): string | null {
  const rawDomain = process.env.NEXT_PUBLIC_DOMAIN_URL?.trim();

  if (!rawDomain) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(rawDomain)
    ? rawDomain
    : `https://${rawDomain}`;

  return withProtocol.replace(/\/$/, "");
}

export async function getTheme(): Promise<CurrentTheme> {
  try {
    const domainUrl = resolveDomainUrl();

    if (!domainUrl) {
      throw new Error("NEXT_PUBLIC_DOMAIN_URL is not defined.");
    }

    const client = new ApiClient("");
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((item) => `${item.name}=${item.value}`)
      .join("; ");

    if (cookieHeader.length > 0) {
      await client.appendHeaders({ Cookie: cookieHeader });
    }

    const response = await client.get<null, { theme: CurrentTheme }>(
      `${domainUrl}/api/theme/get`,
    );

    return response?.theme ?? primaryTheme;
  } catch (error) {
    console.error("Failed to get theme:", error);

    return primaryTheme;
  }
}
