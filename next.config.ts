import type { NextConfig } from "next";
import { optimizedImageHosts } from "./lib/image-hosts";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/News/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/Explore/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/Programs/Clubs/:path*",
        destination: "/clubs",
        permanent: true,
      },
      {
        source: "/Constitution",
        destination: "/UISSConstitution.pdf",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 65, 70, 75],
    minimumCacheTTL: 86_400,
    localPatterns: [
      {
        pathname: "/**",
        search: "",
      },
      {
        pathname: "/leaders/2026-2027/**",
        search: "?v=2",
      },
    ],
    remotePatterns: optimizedImageHosts.map((hostname) => ({ protocol: "https", hostname })),
  },
};

export default nextConfig;
