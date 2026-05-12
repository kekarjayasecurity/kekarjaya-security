import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: "/beranda",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
