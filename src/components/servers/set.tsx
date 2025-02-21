import { formatDate } from "@/lib/format-date";
import { SetType } from "@/types/data.type";
import Link from "next/link";
import { Visibility } from "./visibility";
import { Settings } from "lucide-react";

export function Set({ set }: { set: SetType }) {
  console.log("🚀 ~ Set ~ set:", set);
  return (
    <article className="flex items-center justify-between border-b border-dashed border-gray-500 py-4 first:pt-0 last:border-none">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href={`/set/${set.id}/${set.slug}`}
            className="text-xl font-semibold text-link hover:underline hover:underline-offset-4"
          >
            {set.name}
          </Link>

          <Visibility visibleTo={set.visibleTo} />
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          <span>Author: {set.author}</span>
          <span className="mx-1">-</span>
          <time>{formatDate(set.createdAt)}</time>
        </div>
      </div>

      <Settings className="mr-8 h-5 w-5" />
    </article>
  );
}
