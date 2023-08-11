/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BASE_PATH: string;
  readonly PUBLIC_SHIKI_THEME: string;
  readonly PUBLIC_SITE_TITLE: string;
  readonly PUBLIC_SITE_DESCRIPTION: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
