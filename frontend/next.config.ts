import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/viewer/:path*',
        destination: 'http://ohif:80/viewer/:path*',
      },
      {
        source: '/custom.css',
        destination: 'http://ohif:80/custom.css',
      },
      {
        source: '/logo.png',
        destination: 'http://ohif:80/logo.png',
      },
    ];
  },
};

export default nextConfig;
