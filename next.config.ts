import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], // Add trusted domains for images
  },
};

export default nextConfig;
