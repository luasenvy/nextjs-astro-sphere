import ConnectSocial from "@/components/welcome/ConnectSocial";
import Galaxy from "@/components/welcome/Galaxy";
import Particles from "@/components/welcome/Particles";
import Planet from "@/components/welcome/Planet";
import RecentPosts from "@/components/welcome/RecentPosts";
import SkillStack from "@/components/welcome/SkillStack";
import Stars from "@/components/welcome/Stars";

import WelcomeHero from "@/components/welcome/WelcomeHero";
import WelcomeTypography from "@/components/welcome/WelcomeTypography";
import { site, social, stack, welcome } from "@/config";

import db from "@/lib/db";

export const metadata = {
  title: site.name,
  description: site.description,
};

export default async function HomePage() {
  const posts = (await db).data.blog.slice(0, 3);
  const projects = (await db).data.projects.slice(0, 3);

  return (
    <>
      <Particles />

      <Stars />

      <Galaxy />

      <section className="relative h-screen w-full">
        <Planet />

        <WelcomeHero {...welcome} />
      </section>

      <div className="relative bg-white dark:bg-black">
        <div className="mx-auto max-w-screen-sm space-y-24 p-5 pb-16">
          <WelcomeTypography text={welcome.introduce} />

          <RecentPosts posts={posts} type="blog" />

          <SkillStack stack={stack} />

          <RecentPosts posts={projects} type="projects" />

          <ConnectSocial social={social} />
        </div>
      </div>
    </>
  );
}
