import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export — deployed to Cloudflare Pages as plain HTML/CSS/JS.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
