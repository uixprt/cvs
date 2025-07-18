// next.config.ts
const onGitHubPages = process.env.GITHUB_ACTIONS === "true";
const usingCustomDomain = !!process.env.NEXT_PUBLIC_CUSTOM_DOMAIN; // set in GH secrets if you like

export default {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath:   onGitHubPages && !usingCustomDomain ? "/cvs" : "",
  assetPrefix: onGitHubPages && !usingCustomDomain ? "/cvs/" : "",
} satisfies import("next").NextConfig;
