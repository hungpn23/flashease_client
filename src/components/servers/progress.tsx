import { formatDate } from "@/lib/format-date";
import { MyProgressType } from "@/types/data/progress.type";
import Link from "next/link";

export function MyProgress({ myProgress }: { myProgress: MyProgressType }) {
  return (
    <article className="flex items-center justify-between border-b border-dashed border-gray-500 py-4 first:pt-0 last:border-none">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href={`/progress/${myProgress.id}`}
            className="text-xl font-semibold text-link hover:underline hover:underline-offset-4"
          >
            {myProgress.set.name}
          </Link>
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          <span>Author: {myProgress.user.username}</span>
          <span className="mx-1">-</span>
          <time>{formatDate(myProgress.createdAt)}</time>
        </div>
      </div>
    </article>
  );
}
