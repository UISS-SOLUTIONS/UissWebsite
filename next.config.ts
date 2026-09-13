import type { NextConfig } from "next";

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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
