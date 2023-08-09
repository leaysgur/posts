import { defineCollection, z } from "astro:content";

const postsV1Collection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    html: z.string(),
  }),
});

const postsV2Collection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  "posts-v2": postsV2Collection,
  "posts-v1": postsV1Collection,
};
