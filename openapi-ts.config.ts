import { defineConfig } from "@hey-api/openapi-ts";

const backendUrl = process.env.BE_URL;

if (!backendUrl) {
  throw new Error("BE_URL must be set to generate API types.");
}

export default defineConfig({
  input: `${backendUrl}/api/openapi.json`,
  output: "src/api/generated",
  plugins: ["@hey-api/typescript", { name: "zod", compatibilityVersion: 4 }],
});
