import ArrowDown from "./icons/ArrowDown";

import type { PostItem, PostType } from "@/lib/db";

type ArrowCardProps = {
  post: PostItem;
  type: PostType;
  onSelect: (post: PostItem) => void;
};

export default function ArrowCard({ post, type, onSelect: handleSelect }: ArrowCardProps) {
  return (
    <button
      onClick={() => handleSelect(post)}
      className="group flex w-full items-center gap-3 rounded-lg border border-black/15 p-4 text-left transition-colors duration-300 ease-in-out hover:bg-black/5 dark:border-white/20 hover:dark:bg-white/10"
    >
      <div className="blend w-full group-hover:text-black group-hover:dark:text-white">
        <div className="flex flex-wrap items-center gap-2">
          {
            <div className="rounded-full border border-black/15 px-2 py-0.5 text-sm capitalize dark:border-white/25">
              {type.replace(/^\w/, (c: string) => c.toUpperCase())}
            </div>
          }
          <div className="text-sm uppercase">
            {Intl.DateTimeFormat(undefined, {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }).format(new Date(post.created))}
          </div>
        </div>
        <div className="mt-3 font-semibold text-black dark:text-white">{post.title}</div>

        {/* <div className="text-sm line-clamp-2">{metadata.description}</div> */}
        {/* <ul className="flex flex-wrap mt-2 gap-1">
          {metadata.tags?.map((tag, i) => (
            <li
              key={`tag-${i}`}
              className="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75"
            >
              {tag}
            </li>
          ))}
        </ul> */}
      </div>
      <ArrowDown className="rotate-180 stroke-current group-hover:stroke-black group-hover:dark:stroke-white" />
    </button>
  );
}
