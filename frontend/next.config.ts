import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/ohif/:path*',
        destination: '/api/ohif/:path*',
      },
      {
        source: '/dicom-web/:path*',
        destination: '/api/dicomweb/:path*',
      },
    ];
  },
};

export default nextConfig;
