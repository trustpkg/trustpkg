import { z } from "zod";

export const SearchPackagesParametersSchema = z.object({
  query: z
.string()
.min(1)
.max(214)
.regex(
/^\s*@?[a-z0-9][a-z0-9._-]*(\s+[a-z0-9][a-z0-9._-]*)?(\/[a-z0-9][a-z0-9._-]*)?\s*$/
),
  limit: z.number().int().gte(1).lte(20).optional().default(10)
});

export type SearchPackagesParameters = z.infer<typeof SearchPackagesParametersSchema>;
