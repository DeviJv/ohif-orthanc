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
      // Proxy OHIF static assets that are loaded at root level (JS, CSS, configs)
      {
        source: '/:file(\\w+\\.js)',
        destination: 'http://ohif:80/:file',
      },
      {
        source: '/:file(\\w+\\.css)',
        destination: 'http://ohif:80/:file',
      },
      {
        source: '/:file(.*\\.chunk\\.js)',
        destination: 'http://ohif:80/:file',
      },
      {
        source: '/:file(.*\\.bundle\\..*\\.js)',
        destination: 'http://ohif:80/:file',
      },
      {
        source: '/:file(.*\\.css)',
        destination: 'http://ohif:80/:file',
      },
      {
        source: '/app-config.js',
        destination: 'http://ohif:80/app-config.js',
      },
      {
        source: '/init-service-worker.js',
        destination: 'http://ohif:80/init-service-worker.js',
      },
      {
        source: '/:file(.*\\.woff2)',
        destination: 'http://ohif:80/:file',
      },
      {
        source: '/avatars/:path*',
        destination: 'http://ohif:80/avatars/:path*',
      }
    ];
  },
};

export default nextConfig;
