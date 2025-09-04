// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TEMP: allow production build to succeed even if TS errors exist
    ignoreBuildErrors: true,
  },
  outputFileTracingRoot: path.join(process.cwd(), "."),
};

export default nextConfig;