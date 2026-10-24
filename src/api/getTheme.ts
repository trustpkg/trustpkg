import "server-only";

import {
  primaryTheme,
  themeDefinitions,
} from "@/theme/generated/themes.generated.const";
import type { CurrentTheme } from "@/theme/generated/themes.generated.types";
import { cookies } from "next/headers";

function isCurrentTheme(theme: string | undefined): theme is CurrentTheme {
  return themeDefinitions.some((item) => item.theme === theme);
}

export async function getTheme(): Promise<CurrentTheme> {
  const theme = (await cookies()).get("theme")?.value;

  return isCurrentTheme(theme) ? theme : primaryTheme;
}
