import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A standalone build output, .next/standalone directory, that only includes necessary files/dependencies. Useful for self-hosting in a Docker container.
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "d3pwkd63xuu3ap.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
