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
  searchParams: Promise<{ page?: string; filter?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageParams) {
  const { filter } = await searchParams;
  const page = Number((await searchParams).page);

  const posts = (await db).data.blog;

  const series = getSeries(posts);

  return (
    <>
      <TopLayout className="page-heading">Blog</TopLayout>

      <BottomLayout>
        <PostList
          posts={posts}
          series={series}
          filter={filter}
          page={isNaN(page) ? 1 : page}
          size={pagination.pageSize}
          type="blog"
        />
      </BottomLayout>
    </>
  );
}
