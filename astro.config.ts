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
  compressHTML: true,
  markdown: { shikiConfig: { theme: PUBLIC_SHIKI_THEME ?? "" } },
});
