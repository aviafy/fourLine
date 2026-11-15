import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: { formats: ["image/webp"] },
};

export default config;
