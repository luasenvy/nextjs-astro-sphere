import type { MetadataRoute } from "next";

import db, { getSitemapIndexies, getSitemaps } from "@/lib/db";

// Google's limit is 50,000 URLs per sitemap
const limit = 50000;

export async function generateSitemaps() {
  const posts = (await db).data.blog;

  // Fetch the total number of products and calculate the number of sitemaps needed
  return getSitemapIndexies(posts.length, limit);
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const posts = (await db).data.blog;

  return getSitemaps(posts, id, limit, "blog");
}
