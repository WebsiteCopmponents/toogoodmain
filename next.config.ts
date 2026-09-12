import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jiro.build",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
