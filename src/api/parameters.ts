import { z } from "zod";

export const ListPackagesParametersSchema = z.object({
  page: z.number().int().gte(1).optional().default(1),
  limit: z.number().int().gte(1).lte(50).optional().default(10),
  sortBy: z.string().optional().default("popularity"),
  order: z.string().optional().default("desc"),
  ecosystem: z.string().optional().default("npm")
});

export type ListPackagesParameters = z.infer<typeof ListPackagesParametersSchema>;

export const SearchPackagesParametersSchema = z.object({
  query: z.string().min(1).max(214),
  limit: z.number().int().gte(1).lte(20).optional().default(10)
});

export type SearchPackagesParameters = z.infer<typeof SearchPackagesParametersSchema>;
