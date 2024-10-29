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
      className="w-full group p-4 gap-3 flex text-left items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
    >
      <div className="w-full group-hover:text-black group-hover:dark:text-white blend">
        <div className="flex flex-wrap items-center gap-2">
          {
            <div className="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
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
        <div className="font-semibold mt-3 text-black dark:text-white">{post.title}</div>

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
      <ArrowDown className="stroke-current group-hover:stroke-black group-hover:dark:stroke-white rotate-180" />
    </button>
  );
}
