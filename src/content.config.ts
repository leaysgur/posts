import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postsV1Collection = defineCollection({
  loader: glob({ pattern: "**\/*.json", base: "./content/posts-v1" }),
  schema: z.object({
    title: z.string(),
    html: z.string(),
  }),
});

const postsV2Collection = defineCollection({
  loader: glob({ pattern: "**\/*.md", base: "./content/posts-v2" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  "posts-v2": postsV2Collection,
  "posts-v1": postsV1Collection,
};
