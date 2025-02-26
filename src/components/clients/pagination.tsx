"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState } from "nuqs";
import { parseAsPageIndex } from "@/lib/search-params";
import type { TMetadata } from "@/types/paginated.type";

// TODO: implement limit & order query state
export function Pagination({ metadata }: { metadata: TMetadata }) {
  const [page, setPage] = useQueryState(
    "page",
    parseAsPageIndex
      .withDefault(1)
      .withOptions({ shallow: false, scroll: true }),
  );

  const { totalPages } = metadata;

  return (
    <div className="flex items-center justify-center py-8">
      <Button
        disabled={page <= 1}
        variant="ghost"
        size="icon"
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <Button
        disabled={page >= totalPages}
        variant="ghost"
        size="icon"
        onClick={() => setPage(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
