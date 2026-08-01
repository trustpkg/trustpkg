import { z } from "zod";
import { themeDefinitions } from "@/theme/generated/themes.generated.const";
import type { CurrentTheme } from "@/theme/generated/themes.generated.types";

const availableThemes = themeDefinitions.map((item) => item.theme) as [
  CurrentTheme,
  ...CurrentTheme[],
];

export const setThemePayloadSchema = z.object({
  theme: z.enum(availableThemes),
});

export type SetThemePayload = z.infer<typeof setThemePayloadSchema>;
