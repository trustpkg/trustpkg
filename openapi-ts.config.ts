import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: `${process.env.NEXT_PUBLIC_BE_URL}/api/openapi.json`,
  output: "src/api/generated",
  plugins: ["@hey-api/typescript", { name: "zod", compatibilityVersion: 4 }],
});
