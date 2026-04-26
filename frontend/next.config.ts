import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/orthanc/:path*",
                destination: "/api/orthanc/:path*",
            },
            {
                source: "/dicom-web/:path*",
                destination: "/api/orthanc/dicom-web/:path*",
            },
        ];
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp",
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                ],
            },
        ];
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb",
        },
    },
    output: "standalone",
};

export default nextConfig;
