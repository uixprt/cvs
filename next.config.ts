// next.config.ts / next.config.js
import type { NextConfig } from "next";

const repo      = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";   // "cvs"
const inGH      = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,           // keeps “/about/” HTML working on GitHub Pages
  images: { unoptimized: true }, // needed for static export
  // ────────────────────────────────────────────────────────────────
  basePath:   inGH ? `/${repo}`   : "",   //  →  "/cvs"
  assetPrefix: inGH ? `/${repo}/` : "",   //  →  "/cvs/"
};

export default nextConfig;
