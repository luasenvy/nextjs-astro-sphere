import { redirect } from "next/navigation";

import ArticleBottomLayout from "@/components/ArticleBottomLayout";
import ArticleTopLayout from "@/components/ArticleTopLayout";

import BottomLayout from "@/components/BottomLayout";
import TopLayout from "@/components/TopLayout";

import { getMetadata, getPostArticle } from "@/lib/db";
import { MDXLoader } from "@/lib/mdx-parser";

interface BlogViewerProps {
  searchParams: Promise<{
    filter?: string;
  }>;
  params: Promise<{
    slug: Array<string>;
  }>;
}

// cannot reusable: https://github.com/vercel/next.js/discussions/50080
export async function generateMetadata({ params }: BlogViewerProps) {
  const slug = (await params).slug.join("/");

  const metadata = await getMetadata(slug);
  if (!metadata) return redirect("/404");

  return { title: metadata.title };
}

export default async function BlogViewer({ params, searchParams }: BlogViewerProps) {
  const slug = (await params).slug.join("/");
  const { filter } = await searchParams;

  const { body, curr, prev, next } = await getPostArticle({
    slug,
    filter: filter?.split(",").filter(Boolean),
  });

  if (!curr || !body) return redirect("/404");

  return (
    <>
      <TopLayout>
        <ArticleTopLayout curr={curr} type="blog" />
      </TopLayout>

      <BottomLayout>
        <ArticleBottomLayout
          component={<MDXLoader source={body} />}
          prev={prev}
          next={next}
          type="blog"
        />
      </BottomLayout>
    </>
  );
}
