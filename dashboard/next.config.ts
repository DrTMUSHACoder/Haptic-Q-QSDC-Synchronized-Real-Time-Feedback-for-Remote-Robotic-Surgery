import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Cloudflare Pages Static Export Configuration */
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
