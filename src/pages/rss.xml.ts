import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { toPath, toDate } from "../libs/utils";
import type { APIRoute } from "astro";

const { PUBLIC_SITE_TITLE, PUBLIC_SITE_DESCRIPTION, PUBLIC_BASE_PATH } =
  import.meta.env;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = new URL(site!);
  siteUrl.pathname = PUBLIC_BASE_PATH;

  const [allPostsV1, allPostsV2] = await Promise.all([
    getCollection("posts-v1"),
    getCollection("posts-v2"),
  ]);

  const allPosts = [...allPostsV1, ...allPostsV2].map((p) => ({
    title: p.data.title,
    link: toPath(p.id),
    pubDate: toDate(p.id),
  }));
  allPosts.sort((a, b) => b.link.localeCompare(a.link));

  return rss({
    title: PUBLIC_SITE_TITLE,
    description: PUBLIC_SITE_DESCRIPTION,
    site: siteUrl,
    items: allPosts,
  });
};
