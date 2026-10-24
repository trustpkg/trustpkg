import type { z } from "zod";
import {
  zGetPackagePath,
  zListPackagesQuery,
  zSearchPackagesQuery,
} from "./generated/zod.gen";

export const GetPackageParametersSchema = zGetPackagePath;
export type GetPackageParameters = z.infer<typeof GetPackageParametersSchema>;

export const ListPackagesParametersSchema = zListPackagesQuery;
export type ListPackagesParameters = z.infer<typeof ListPackagesParametersSchema>;

export const SearchPackagesParametersSchema = zSearchPackagesQuery;
export type SearchPackagesParameters = z.infer<typeof SearchPackagesParametersSchema>;
