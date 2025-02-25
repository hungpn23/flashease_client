import { formatDate } from "@/lib/format-date";
import { ProgressDetailType } from "@/types/data/progress.type";
import Link from "next/link";

export function ProgressDetail({
  progressDetail,
}: {
  progressDetail: ProgressDetailType;
}) {
  return (
    <article className="items-center justify-between border-b border-dashed border-gray-500 py-4 first:pt-0 last:border-none">
      <Link
        href={`/progress/${progressDetail.progress.id}`}
        className="text-heading text-xl font-semibold hover:underline hover:underline-offset-4"
      >
        {progressDetail.progress.set.name}
      </Link>

      <div className="mt-2 text-sm text-muted-foreground">
        <span>Author: {progressDetail.progress.user.username}</span>
        <span className="mx-1">•</span>
        <time>Created at: {formatDate(progressDetail.progress.createdAt)}</time>
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        <span className="text-foreground">
          Total cards: {progressDetail.metadata.totalCards}
        </span>
        <span className="mx-1">•</span>
        <span className="text-heading">
          Not studied: {progressDetail.metadata.notStudiedCount}
        </span>
        <span className="mx-1">•</span>
        <span className="text-link">
          Learning: {progressDetail.metadata.learningCount}
        </span>
        <span className="mx-1">•</span>
        <span className="text-highlight">
          Known: {progressDetail.metadata.knownCount}
        </span>
      </div>
    </article>
  );
}
