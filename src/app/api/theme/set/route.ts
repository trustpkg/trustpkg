import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { setThemePayloadSchema } from "@/theme/themeApi.validation";
import {
  primaryTheme,
  themeDefinitions,
} from "@/theme/generated/themes.generated.const";

const THEME_COOKIE_NAME = "theme";
const THEME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

interface ApiErrorResponse {
  code: string;
  message: string;
  issues?: unknown;
}

function errorResponse(
  code: string,
  message: string,
  status: number,
  issues?: unknown,
) {
  const payload: ApiErrorResponse = {
    code,
    message,
  };

  if (issues !== undefined) {
    payload.issues = issues;
  }

  return NextResponse.json(payload, { status });
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const parsedPayload = setThemePayloadSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return errorResponse(
      "INVALID_PAYLOAD",
      "Invalid payload.",
      400,
      parsedPayload.error.issues,
    );
  }

  const selectedTheme = parsedPayload.data.theme;
  const availableThemes = themeDefinitions.map((item) => item.theme);

  if (!availableThemes.includes(selectedTheme)) {
    return errorResponse("INVALID_THEME", "Invalid theme.", 400, {
      availableThemes,
    });
  }

  const responsePayload = {
    message: "Theme cookie updated.",
    theme: selectedTheme,
    defaultTheme: primaryTheme,
  };

  revalidatePath("/api/theme/get");

  const response = NextResponse.json(responsePayload, { status: 200 });
  response.cookies.set({
    name: THEME_COOKIE_NAME,
    value: selectedTheme,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THEME_COOKIE_MAX_AGE_SECONDS,
  });

  return response;
}
