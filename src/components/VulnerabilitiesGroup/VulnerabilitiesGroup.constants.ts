import { z } from "zod";

export const MONTHS_PARAM = "months";
export const DEFAULT_MONTHS = "all";
export const MONTHS_PRESETS = [DEFAULT_MONTHS, "1", "3", "12"] as const;

export const monthsNumberSchema = z.coerce.number().int().min(1).max(12);

type Months = "all" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

export const monthsSchema = z
  .union([z.literal(DEFAULT_MONTHS), monthsNumberSchema.transform((value) => String(value) as Months)])
  .catch(DEFAULT_MONTHS);
