import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // https://ik.imagekit.io/MohamedAhmed/codenyImages
  // /* config options here */
  // igonre errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/MohamedAhmed/codenyImages/**", // Use `pathname` instead of `path`
      },

   
    ],
  },
};

export default nextConfig;
