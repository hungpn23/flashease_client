import { formatDate } from "@/lib/format-date";
import { SetType } from "@/types/data.type";
import Link from "next/link";

export function Set({ set }: { set: SetType }) {
  return (
    <article className="border-b border-dashed border-gray-500 py-4 first:pt-0 last:border-none">
      <Link
        href={`/set/${set.id}/${set.slug}`}
        className="text-xl font-semibold text-link hover:underline hover:underline-offset-4"
      >
        {set.name}
      </Link>

      <div className="mt-2 text-sm text-muted-foreground">
        <time>{formatDate(set.createdAt)}</time>
        <span className="mx-1">·</span>
      </div>
    </article>
  );
}
