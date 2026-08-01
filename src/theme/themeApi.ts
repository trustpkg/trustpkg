import type { CurrentTheme } from "@/theme/generated/themes.generated.types";
import { apiClient } from "@/utils/api";

interface SetThemeRequestBody {
  theme: string;
}

interface SetThemeResponse {
  message: string;
  theme: CurrentTheme;
  defaultTheme: CurrentTheme;
}

interface SetThemeErrorResponse {
  code: string;
  message: string;
  issues?: unknown;
}

export async function setTheme(
  theme: string,
): Promise<SetThemeResponse | SetThemeErrorResponse> {
  return apiClient.post<
    SetThemeRequestBody,
    SetThemeErrorResponse,
    SetThemeResponse
  >("/api/theme/set", { theme });
}
