import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

type packagesApi_ListResponse = Partial<{
  documents: Array<packagesApi_PackageListDocument>;
  message: string;
  status: number;
}>;
type packagesApi_PackageListDocument = Partial<{
  ecosystem: string;
  id: number;
  is_deprecated: boolean;
  name: string;
  popularity: number;
  slug: string;
  vulnerabilities: {};
  vulnerability_counts: {};
}>;
type packagesApi_Vulnerability = Partial<{
  affected: Array<packagesApi_AffectedPackage>;
  cve_id: string;
  cvss_score: number;
  cvss_vector: string;
  description: string;
  id: number;
  modified_at: string;
  osv_id: string;
  published_at: string;
  references: Array<string>;
  severity: string;
  summary: string;
  withdrawn_at: string;
}>;
type packagesApi_AffectedPackage = Partial<{
  ecosystem: string;
  fixed_version: string;
  introduced_version: string;
  last_affected_version: string;
}>;
type packagesApi_SearchResponse = Partial<{
  documents: Array<packagesApi_SearchDocument>;
  message: string;
  status: number;
}>;
type packagesApi_SearchDocument = {
  /**
   * Package ecosystem.
   *
   * @enum npm
   */
  ecosystem: "npm";
  /**
   * Database package identifier.
   *
   * @minLength 1
   * @maxLength 19
   */
  id: string;
  /**
   * Whether npm marks the package as deprecated.
   */
  is_deprecated: boolean;
  /**
   * npm package name.
   *
   * @minLength 1
   * @maxLength 214
   */
  name: string;
  /**
   * Download popularity score.
   *
   * @minimum 0
   */
  popularity: number;
  /**
   * URL-safe package identifier.
   *
   * @minLength 1
   */
  slug: string;
  /**
   * Monthly vulnerability counts keyed by YYYY-MM.
   */
  vulnerabilities: {};
};

const packagesApi_AffectedPackage: z.ZodType<packagesApi_AffectedPackage> = z
  .object({
    ecosystem: z.string(),
    fixed_version: z.string(),
    introduced_version: z.string(),
    last_affected_version: z.string(),
  })
  .partial()
  .passthrough();
const packagesApi_Vulnerability: z.ZodType<packagesApi_Vulnerability> = z
  .object({
    affected: z.array(packagesApi_AffectedPackage),
    cve_id: z.string(),
    cvss_score: z.number(),
    cvss_vector: z.string(),
    description: z.string(),
    id: z.number().int(),
    modified_at: z.string(),
    osv_id: z.string(),
    published_at: z.string(),
    references: z.array(z.string()),
    severity: z.string(),
    summary: z.string(),
    withdrawn_at: z.string(),
  })
  .partial()
  .passthrough();
const packagesApi_PackageListDocument: z.ZodType<packagesApi_PackageListDocument> =
  z
    .object({
      ecosystem: z.string(),
      id: z.number().int(),
      is_deprecated: z.boolean(),
      name: z.string(),
      popularity: z.number().int(),
      slug: z.string(),
      vulnerabilities: z.record(z.array(packagesApi_Vulnerability)),
      vulnerability_counts: z.record(z.number().int()),
    })
    .partial()
    .passthrough();
const packagesApi_ListResponse: z.ZodType<packagesApi_ListResponse> = z
  .object({
    documents: z.array(packagesApi_PackageListDocument),
    message: z.string(),
    status: z.number().int(),
  })
  .partial()
  .passthrough();
const packagesApi_SearchDocument: z.ZodType<packagesApi_SearchDocument> = z
  .object({
    ecosystem: z.literal("npm"),
    id: z.string().min(1).max(19),
    is_deprecated: z.boolean(),
    name: z.string().min(1).max(214),
    popularity: z.number().int().gte(0),
    slug: z.string().min(1),
    vulnerabilities: z.record(z.number().int()),
  })
  .passthrough();
const packagesApi_SearchResponse: z.ZodType<packagesApi_SearchResponse> = z
  .object({
    documents: z.array(packagesApi_SearchDocument),
    message: z.string(),
    status: z.number().int(),
  })
  .partial()
  .passthrough();

export const schemas = {
  packagesApi_AffectedPackage,
  packagesApi_Vulnerability,
  packagesApi_PackageListDocument,
  packagesApi_ListResponse,
  packagesApi_SearchDocument,
  packagesApi_SearchResponse,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/api/packages/list",
    alias: "listPackages",
    description: `List packages with pagination and sorting.`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().gte(1).optional().default(1),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).lte(50).optional().default(10),
      },
      {
        name: "sortBy",
        type: "Query",
        schema: z.string().optional().default("popularity"),
      },
      {
        name: "order",
        type: "Query",
        schema: z.string().optional().default("desc"),
      },
      {
        name: "ecosystem",
        type: "Query",
        schema: z.string().optional().default("npm"),
      },
    ],
    response: packagesApi_ListResponse,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: packagesApi_ListResponse,
      },
      {
        status: 404,
        description: `Not Found`,
        schema: packagesApi_ListResponse,
      },
      {
        status: 429,
        description: `Too Many Requests`,
        schema: packagesApi_ListResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: packagesApi_ListResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/packages/search",
    alias: "searchPackages",
    description: `Searches npm package names using prefix matching and returns the complete package documents.`,
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string().min(1).max(214),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).lte(20).optional().default(10),
      },
    ],
    response: packagesApi_SearchResponse,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: packagesApi_SearchResponse,
      },
      {
        status: 429,
        description: `Too Many Requests`,
        schema: packagesApi_SearchResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: packagesApi_SearchResponse,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
