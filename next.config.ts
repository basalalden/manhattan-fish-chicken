import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/fullmenu',
        destination: '/menu',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
