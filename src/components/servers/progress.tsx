import { formatDate } from "@/lib/format-date";
import { ProgressWithMetadataType } from "@/types/data/progress.type";
import Link from "next/link";

export function ProgressWithMetadata({
  progress,
}: {
  progress: ProgressWithMetadataType;
}) {
  return (
    <article className="flex items-center justify-between border-b border-dashed border-gray-500 py-4 first:pt-0 last:border-none">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href={`/progress/${progress.id}`}
            className="text-heading text-xl font-semibold hover:underline hover:underline-offset-4"
          >
            {progress.set.name}
          </Link>
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          <span>Author: {progress.user.username}</span>
          <span className="mx-1">-</span>
          <time>{formatDate(progress.createdAt)}</time>
          <span className="mx-1">-</span>
          <span className="text-foreground">
            Total cards: {progress.metadata.totalCards}
          </span>
          <span className="mx-1">-</span>
          <span className="text-heading">
            Not studied: {progress.metadata.notStudiedCount}
          </span>
          <span className="mx-1">-</span>
          <span className="text-link">
            Learning: {progress.metadata.learningCount}
          </span>
          <span className="mx-1">-</span>
          <span className="text-highlight">
            Known: {progress.metadata.knownCount}
          </span>
        </div>
      </div>
    </article>
  );
}
