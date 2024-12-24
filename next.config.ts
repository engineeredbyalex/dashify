import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "maybee-nextjs-ecommerce.s3.amazonaws.com",
    ], // Add the domain here
  },
};

export default nextConfig;
