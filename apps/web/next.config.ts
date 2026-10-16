import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@splinetool/react-spline"],
  async redirects() {
    return [
      { source: "/skills", destination: "/plugins", permanent: true },
      { source: "/skills/:slug", destination: "/plugins/:slug", permanent: true },
      { source: "/dashboard/skills", destination: "/dashboard/plugins", permanent: true },
    ];
  },
};

export default nextConfig;
