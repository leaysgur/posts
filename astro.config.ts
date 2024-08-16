import { loadEnv } from "vite";
import { defineConfig } from "astro/config";

const { PUBLIC_BASE_PATH, PUBLIC_SHIKI_THEME } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  "",
);

export default defineConfig({
  site: "https://leaysgur.github.io",
  base: PUBLIC_BASE_PATH ?? "",
  // GitHub Pages requires trailing slash w/ `format: directory`
  trailingSlash: "always",
  // @ts-ignore: type string is too loose
  markdown: { shikiConfig: { theme: PUBLIC_SHIKI_THEME ?? "" } },
  experimental: {
    contentLayer: true,
  }
});
