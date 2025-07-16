import { Fragment } from "react";
import Container from "@/components/Container";
import type { PostArticle } from "@/lib/db";
import { MDXLoader } from "@/lib/mdx-parser";
import CareerItem from "./CareerItem";

export interface CareerLayoutProps {
  careers: Array<PostArticle>;
}

export default function CareerLayout({ careers }: CareerLayoutProps) {
  return (
    <div className="flex-1 py-5">
      <Container size="md">
        <ul>
          {careers.map(
            ({ body, curr }, i) =>
              curr && (
                <Fragment key={`career-${i}`}>
                  <CareerItem curr={curr} />
                  <article className="prose dark:prose-invert">
                    <MDXLoader source={body} />
                  </article>
                </Fragment>
              ),
          )}
        </ul>
      </Container>
    </div>
  );
}
