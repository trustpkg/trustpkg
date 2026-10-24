import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: true,
  },
  output: process.env.IS_PRODUCTION_BUILD === "true" ? 'standalone' : undefined,
  images: {
    minimumCacheTTL: 60 * 60 * 24,
    qualities: [25, 50, 75, 85, 100]
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
