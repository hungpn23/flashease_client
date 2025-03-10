import { findPaginated } from "@/actions/find-paginated.action";
import { Pagination } from "@/components/clients/pagination";
import { SetComponent } from "@/components/servers/set";
import { Blockquote, BlockquoteAuthor } from "@/components/ui/blockquote";
import { Button } from "@/components/ui/button";
import { searchParamsCache } from "@/lib/search-params";
import { SetDetail } from "@/types/set";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SearchParams } from "nuqs/server";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, take, order } = searchParamsCache.parse(await searchParams);
  const res = await findPaginated<SetDetail>("/set/library", page, take, order);

  if ("statusCode" in res) throw new Error("failed to fetch data");

  const { data, metadata } = res;

  return (
    <div className="flex flex-col flex-wrap">
      <Blockquote className="mb-4">
        Happiness lies not in the mere possession of money; it lies in the joy
        of achievement, in the thrill of creative effort.
        <BlockquoteAuthor>Franklin Roosevelt</BlockquoteAuthor>
      </Blockquote>

      <div className="mb-4 flex items-center">
        <p className="text-sm text-muted-foreground">
          Click a set to start learning.
        </p>

        <Button className="ml-auto mr-4 w-fit" asChild>
          <Link href="/create-set">
            Create set <Plus className="inline h-4 w-4" />
          </Link>
        </Button>
      </div>

      {data.map(({ set, metadata }) => (
        <SetComponent
          path="library"
          key={set.id}
          set={set}
          metadata={metadata}
        />
      ))}

      <Pagination key={metadata.totalPages} metadata={metadata} />
    </div>
  );
}
