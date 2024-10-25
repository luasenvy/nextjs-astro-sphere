import { readFileSync, readdirSync, statSync } from "fs";
import { dirname, join } from "path";

import { Feed } from "feed";

import { JSONFilePreset } from "lowdb/node";

import { author, logo, site } from "@/config";

const currentDirname = dirname(import.meta.url).substring("file://".length);

const storage = join(currentDirname, "../app/posts");

export type PostType = "posts" | "projects" | "careers" | "legals";

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
  posts: Array<PostItem>;
  projects: Array<PostItem>;
  careers: Array<PostItem>;
  legals: Array<PostItem>;
}

const filenames = readdirSync(storage, { recursive: true });

const dbfilepath = join(process.env.DB_PATH ?? ".", ".db.json");

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
  posts: [],
  projects: [],
  careers: [],
  legals: [],
})
  // initialize
  .then((db) => {
    // clear all data
    db.data.posts = [];
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
      else entryTo(db.data.posts, strname, created, updated, "posts");
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
  const slug = strname.replace(/\..+$/, "");

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
  return db.then(({ data: { [dbname ?? "posts"]: posts } }) =>
    posts.find(({ slug: s }) => slug === s)
  );
}

export interface PostArticle {
  body?: string;
  curr?: PostItem;
  prev?: PostItem;
  next?: PostItem;
}

export function getPostArticle(slug: string, dbname?: PostType): Promise<PostArticle> {
  return db.then(({ data: { [dbname ?? "posts"]: posts } }) => {
    const curr = posts.findIndex(({ slug: s }) => s === slug);

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

export default db;
