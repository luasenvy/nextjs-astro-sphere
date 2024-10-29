import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join } from "path";

import { Feed } from "feed";

import { JSONFilePreset } from "lowdb/node";

import type { MetadataRoute } from "next";

import { author, logo, site } from "@/config";

export type PostType = "blog" | "projects" | "careers" | "legals";

export interface PostItem {
  series?: string;
  slug: string;
  title: string;
  created: number;
  updated: number;

  demo?: string;
  repo?: string;
}

interface DatabaseSchema {
  blog: Array<PostItem>;
  projects: Array<PostItem>;
  careers: Array<PostItem>;
  legals: Array<PostItem>;
}

const storage = join(process.cwd(), "./public/posts");
const dbfilepath = join(storage, "db.json");

// nextjs + lowdb + fs is have permission issue
if (!existsSync(dbfilepath)) writeFileSync(dbfilepath, "{}", { encoding: "utf8", mode: 0o755 });

const filenames = readdirSync(storage, { recursive: true });

export const feed = new Feed({
  title: site.name,
  description: site.description,
  id: site.baseurl,
  link: site.baseurl,
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: logo.light,
  favicon: `${site.baseurl}/favicon.ico`,
  copyright: `2024 ${author.name} All rights reserved`,
  updated: new Date(),
  generator: "Next.js",
  feedLinks: {
    json: `${site.baseurl}/json`,
    atom: `${site.baseurl}/atom`,
    rss2: `${site.baseurl}/rss2`,
  },
  author: {
    name: author.name,
    email: author.email,
    link: author.link,
  },
});

const db = JSONFilePreset<DatabaseSchema>(dbfilepath, {
  blog: [],
  projects: [],
  careers: [],
  legals: [],
})
  // initialize
  .then((db) => {
    // clear all data
    db.data.blog = [];
    db.data.projects = [];
    db.data.careers = [];
    db.data.legals = [];

    for (const filename of filenames) {
      const strname = String(filename);

      const filepath = join(storage, strname);
      const stat = statSync(filepath);

      if (stat.isDirectory() || !strname.endsWith(".mdx")) continue;

      const created = stat.ctime.getTime();
      const updated = stat.mtime.getTime();

      const [series, ...pathname] = strname.split("/");

      const table = db.data[series as keyof DatabaseSchema];

      if (table)
        entryTo(table, pathname.join("/"), created, updated, series as keyof DatabaseSchema);
      else entryTo(db.data.blog, strname, created, updated, "blog");
    }

    db.write();

    return db;
  });

function entryTo(
  db: Array<PostItem>,
  strname: string,
  created: number,
  updated: number,
  type: PostType
): void {
  const slug = strname.substring(0, strname.lastIndexOf("."));

  const [series, ...pathname] = strname.split("/");

  feed.addItem({
    id: slug,
    title: slug,
    link: `${site.baseurl}/${type}/${slug}`,
    // TODO: add metadata
    // description: metadata.description,
    // content: metadata.content,
    date: new Date(created),
    author: [
      {
        name: author.name,
        email: author.email,
        link: author.link,
      },
    ],
  });

  if (db.some(({ slug: s }) => s === slug)) return;

  db.push(getItem(series, pathname.join("/"), slug, created, updated));
}

function getItem(series: string, pathname: string, slug: string, created: number, updated: number) {
  return {
    series: pathname.length ? series : undefined,
    slug,
    title: slug.substring(slug.lastIndexOf("/") + 1),
    created,
    updated,
  };
}

export function getMetadata(
  slug: string,
  dbname?: keyof DatabaseSchema
): Promise<PostItem | undefined> {
  const decoded = decodeURIComponent(slug);
  return db.then(({ data: { [dbname ?? "blog"]: posts } }) =>
    posts.find(({ slug: s }) => decoded === s)
  );
}

export interface PostArticle {
  body?: string;
  curr?: PostItem;
  prev?: PostItem;
  next?: PostItem;
}

export function getPostArticle({
  slug,
  filter,
  dbname,
}: {
  slug: string;
  filter?: Array<string>;
  dbname?: PostType;
}): Promise<PostArticle> {
  const decoded = decodeURIComponent(slug);
  return db.then(({ data: { [dbname ?? "blog"]: contents } }) => {
    const posts = contents.filter(({ series }) =>
      filter?.length ? filter.includes(series ?? "") : true
    );

    const curr = posts.findIndex(({ slug: s }) => decoded === s);

    const cursor: PostArticle = {
      body: getContent(posts[curr]?.slug, dbname),
      curr: posts[curr],
    };

    if (curr > 0) cursor.prev = posts[curr - 1];
    if (curr < posts.length - 1) cursor.next = posts[curr + 1];

    return cursor;
  });
}

export function getContent(pathname: string, dbname: string = "") {
  return readFileSync(join(storage, dbname, `${pathname}.mdx`), "utf8");
}

export function getSeries(posts: Array<PostItem>) {
  return Array.from(
    posts.reduce((acc, { series }) => (series ? acc.add(series) : acc), new Set<string>())
  );
}

export function getSitemapIndexies(total: number, limit: number): Array<{ id: number }> {
  return new Array(Math.ceil(total / limit)).fill(0).map((_, id) => ({ id }));
}

export function getSitemaps(
  posts: Array<PostItem>,
  id: number,
  limit: number,
  type: PostType
): MetadataRoute.Sitemap {
  const from = id * limit;

  return posts.slice(from, from + limit).map(({ slug, updated }) => ({
    url: `${site.baseurl}/${type}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: new Date(updated).toLocaleString(),
  }));
}

export default db;
