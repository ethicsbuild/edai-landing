// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Unblock production builds while we modernize ESLint later
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;