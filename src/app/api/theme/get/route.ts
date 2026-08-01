import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  primaryTheme,
  themeDefinitions,
} from "@/theme/generated/themes.generated.const";
import type { CurrentTheme } from "@/theme/generated/themes.generated.types";

const THEME_COOKIE_NAME = "theme";

function getAvailableThemes(): CurrentTheme[] {
  return themeDefinitions.map((item) => item.theme);
}

function isCurrentTheme(theme: string): theme is CurrentTheme {
  return getAvailableThemes().includes(theme as CurrentTheme);
}

export async function GET() {
  try {
    const availableThemes = getAvailableThemes();
    const cookieStore = await cookies();
    const cookieTheme = cookieStore.get(THEME_COOKIE_NAME)?.value;
    const theme =
      cookieTheme && isCurrentTheme(cookieTheme) ? cookieTheme : primaryTheme;

    const result = {
      theme,
      defaultTheme: primaryTheme,
      availableThemes,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        code: "THEME_READ_FAILED",
        message: "Failed to read theme.",
        issues: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
