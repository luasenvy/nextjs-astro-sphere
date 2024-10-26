import type { SVGAttributes } from "react";

export default function ArrowDown(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line
        x1="19"
        y1="12"
        x2="5"
        y2="12"
        className="scale-x-0 group-hover:scale-x-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
      />
      <polyline
        points="12 19 5 12 12 5"
        className="translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
      />
    </svg>
  );
}
