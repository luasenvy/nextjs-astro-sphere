import Link from "@/components/ViewTransitionLink";

export interface StackCardProps {
  text: string;
  href: string;
}

export default function StackCard({ text, href }: StackCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className="blend group flex w-fit items-center gap-2 rounded border border-neutral-200 px-2 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800"
    >
      {text}
    </Link>
  );
}
