import { formatDate } from "@/lib/format-date";
import { ProgressWithMetadataType } from "@/types/data/progress.type";
import Link from "next/link";

export function ProgressWithMetadata({
  item,
}: {
  item: ProgressWithMetadataType;
}) {
  return (
    <article className="items-center justify-between border-b border-dashed border-gray-500 py-4 first:pt-0 last:border-none">
      <Link
        href={`/progress/${item.progress.id}`}
        className="text-heading text-xl font-semibold hover:underline hover:underline-offset-4"
      >
        {item.progress.set.name}
      </Link>

      <div className="mt-2 text-sm text-muted-foreground">
        <span>Author: {item.progress.user.username}</span>
        <span className="mx-1">•</span>
        <time>Created at: {formatDate(item.progress.createdAt)}</time>
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        <span className="text-foreground">
          Total cards: {item.metadata.totalCards}
        </span>
        <span className="mx-1">•</span>
        <span className="text-heading">
          Not studied: {item.metadata.notStudiedCount}
        </span>
        <span className="mx-1">•</span>
        <span className="text-link">
          Learning: {item.metadata.learningCount}
        </span>
        <span className="mx-1">•</span>
        <span className="text-highlight">
          Known: {item.metadata.knownCount}
        </span>
      </div>
    </article>
  );
}
