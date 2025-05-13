import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "https://ik.imagekit.io/MohamedAhmed/Rubublic%20Imgs/offers/elngdaa.png?updatedAt=1740589460139"
  // "(https://backend-three-nu-89.vercel.app/public/imgs/products/product-67ce1e1eee3b8e988912e4bd-1745422240572.jpeg"
  // https://ik.imagekit.io/MohamedAhmed/RebublicImgs/uploads
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
      // {
      //   protocol: "https",
      //   hostname: "ik.imagekit.io",
      //   pathname: "/MohamedAhmed/Rubublic%20Imgs/**", // Use `pathname` instead of `path`
      // },
      // {
      //   protocol: "https",
      //   hostname: "backend-three-nu-89.vercel.app",
      //   pathname: "/public/imgs/**", // Use `pathname` instead of `path`
      // },
   
    ],
  },
};

export default nextConfig;
