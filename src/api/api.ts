import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

type packagesApi_SearchResponse = {
  documents?: Array<packagesApi_SearchDocument> | undefined;
  /**
   * @minLength 1
   * @maxLength 64
   */
  message: string;
  /**
   * @enum 200, 400, 429, 500
   */
  status: 200 | 400 | 429 | 500;
};
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
   * @pattern ^\s*@?[a-z0-9][a-z0-9._-]*(\s+[a-z0-9][a-z0-9._-]*)?(/[a-z0-9][a-z0-9._-]*)?\s*$
   */
  name: string;
  /**
   * Download popularity score.
   *
   * @minimum 0
   */
  popularity: number;
  /**
   * Monthly vulnerability counts keyed by YYYY-MM.
   */
  vulnerabilities: {};
};

const packagesApi_SearchDocument: z.ZodType<packagesApi_SearchDocument> = z
  .object({
    ecosystem: z.literal("npm"),
    id: z.string().min(1).max(19),
    is_deprecated: z.boolean(),
    name: z
      .string()
      .min(1)
      .max(214)
      .regex(
        /^\s*@?[a-z0-9][a-z0-9._-]*(\s+[a-z0-9][a-z0-9._-]*)?(\/[a-z0-9][a-z0-9._-]*)?\s*$/
      ),
    popularity: z.number().int().gte(0),
    vulnerabilities: z.record(z.number().int().gte(1)),
  })
  .passthrough();
const packagesApi_SearchResponse: z.ZodType<packagesApi_SearchResponse> = z
  .object({
    documents: z.array(packagesApi_SearchDocument).optional(),
    message: z.string().min(1).max(64),
    status: z.union([
      z.literal(200),
      z.literal(400),
      z.literal(429),
      z.literal(500),
    ]),
  })
  .passthrough();

export const schemas = {
  packagesApi_SearchDocument,
  packagesApi_SearchResponse,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/packages/search",
    alias: "searchPackages",
    description: `Searches npm package names using prefix matching and returns the complete package documents.`,
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z
          .string()
          .min(1)
          .max(214)
          .regex(
            /^\s*@?[a-z0-9][a-z0-9._-]*(\s+[a-z0-9][a-z0-9._-]*)?(\/[a-z0-9][a-z0-9._-]*)?\s*$/
          ),
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
