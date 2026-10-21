import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sample catalog imagery is served from Pexels until real product photos exist.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" },
    ],
  },
};

export default nextConfig;
