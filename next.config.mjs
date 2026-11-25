// GitHub Pages preview: the deploy workflow sets GITHUB_PAGES=true, which builds a
// static export served from https://<user>.github.io/Pearl-Removals/.
// Local dev and Vercel builds are unaffected.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? process.env.PAGES_BASE_PATH || "/Pearl-Removals" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  ...(isPages && { output: "export", basePath }),
  images: {
    // Static hosting has no image optimizer; images load straight from the live site.
    unoptimized: isPages,
    formats: ["image/avif", "image/webp"],
  },
};
export default nextConfig;
