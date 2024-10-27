import BottomLayout from "@/components/BottomLayout";
import Search from "@/components/Search";

import TopLayout from "@/components/TopLayout";

import { site } from "@/config";
import db from "@/lib/db";

export const metadata = {
  title: `${site.name} - Find Something.`,
  description: `Search Contents in ${site.name}.`,
};

export default async function SearchPage() {
  const { blog, projects, legals } = (await db).data;

  return (
    <>
      <TopLayout>Search</TopLayout>
      <BottomLayout>
        <Search posts={blog} projects={projects} legals={legals} />
      </BottomLayout>
    </>
  );
}
