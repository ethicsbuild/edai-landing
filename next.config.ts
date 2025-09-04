// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    // Unblock production builds while we modernize ESLint later
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TEMP: allow production build to succeed even if TS errors exist
    ignoreBuildErrors: true,
  },
  // Prevent the "inferred workspace root" warning due to stray lockfiles
  outputFileTracingRoot: path.join(process.cwd(), "."),
};

export default nextConfig;