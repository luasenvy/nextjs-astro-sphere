import BottomLayout from "@/components/BottomLayout";
import PostList from "@/components/PostList";
import TopLayout from "@/components/TopLayout";

import { author, pagination, site } from "@/config";
import db, { getSeries } from "@/lib/db";

export const metadata = {
  title: `${site.name} - ${author.name}'s Blog`,
  description: `${author.name}'s Blog Posts.`,
};

interface BlogPageParams {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageParams) {
  const page = Number((await searchParams).page ?? "1");

  const posts = (await db).data.blog;

  const series = getSeries(posts);

  return (
    <>
      <TopLayout className="page-heading">Blog</TopLayout>

      <BottomLayout>
        <PostList
          posts={posts}
          series={series}
          page={page}
          size={pagination.pageSize}
          type="blog"
        />
      </BottomLayout>
    </>
  );
}
