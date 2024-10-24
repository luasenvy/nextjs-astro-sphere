import ArticleBottomLayout from "@/components/ArticleBottomLayout";
import ArticleTopLayout from "@/components/ArticleTopLayout";
import BottomLayout from "@/components/BottomLayout";
import TopLayout from "@/components/TopLayout";

import { find } from "@/lib/find";

interface ProjectViewerProps {
  params: Promise<{
    slug: string;
  }>;
}

// cannot reusable: https://github.com/vercel/next.js/discussions/50080
export async function generateMetadata({ params }: ProjectViewerProps) {
  const { slug } = await params;
  const { title, description } = find({ collection: "projects", slug })?.metadata || {};
  return { title, description };
}

export default async function ProjectViewer({ params }: ProjectViewerProps) {
  const { slug } = await params;
  return (
    <>
      <TopLayout>
        <ArticleTopLayout collection="projects" slug={slug} />
      </TopLayout>
      <BottomLayout>
        <ArticleBottomLayout collection="projects" slug={slug} />
      </BottomLayout>
    </>
  );
}
