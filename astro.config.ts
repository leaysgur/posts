import { loadEnv } from "vite";
import { defineConfig } from "astro/config";

const { PUBLIC_SHIKI_THEME } = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default defineConfig({
  site: "https://leaysgur.github.io/posts",
  base: "/posts",
  compressHTML: true,
  markdown: {
    shikiConfig: {
      wrap: true,
      theme: PUBLIC_SHIKI_THEME ?? "",
    },
  },
});
