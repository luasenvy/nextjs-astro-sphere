import BottomLayout from "@/components/BottomLayout";
import PostList from "@/components/PostList";
import TopLayout from "@/components/TopLayout";

import { author, pagination, site } from "@/config";
import db, { getSeries } from "@/lib/db";

export const metadata = {
  title: `${site.name} - ${author.name}'s Project`,
  description: `${author.name}'s Project List.`,
};

interface ProjectPageParams {
  searchParams: Promise<{ page?: string; filter?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectPageParams) {
  const { filter } = await searchParams;
  const page = Number((await searchParams).page);

  const projects = (await db).data.projects;

  const series = getSeries(projects);

  return (
    <>
      <TopLayout className="page-heading">Projects</TopLayout>

      <BottomLayout>
        <PostList
          posts={projects}
          series={series}
          filter={filter}
          page={isNaN(page) ? 1 : page}
          size={pagination.pageSize}
          type="projects"
        />
      </BottomLayout>
    </>
  );
}
