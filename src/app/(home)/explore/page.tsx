import { findPaginated } from "@/app/(home)/_actions/find-paginated.action";
import { Pagination } from "@/app/(home)/_components/pagination";
import { SetUI } from "@/app/(home)/_components/set";
import { Blockquote, BlockquoteAuthor } from "@/components/ui/blockquote";
import { searchParamsCache } from "@/lib/search-params";
import { Set } from "@/types/data/set.type";
import { SearchParams } from "nuqs/server";

export default async function Explore({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, take, order } = searchParamsCache.parse(await searchParams);
  const res = await findPaginated<Set>("/set/explore", page, take, order);

  if ("statusCode" in res) throw new Error("failed to fetch data");

  const { data, metadata } = res;

  return (
    <div className="flex flex-col flex-wrap">
      <Blockquote className="mb-4">
        Happiness lies not in the mere possession of money; it lies in the joy
        of achievement, in the thrill of creative effort.
        <BlockquoteAuthor>Franklin Roosevelt</BlockquoteAuthor>
      </Blockquote>

      <p className="text-sm text-muted-foreground">
        Click a set see cards and start learning.
      </p>

      {data.map((set) => (
        <SetUI path="explore" key={set.id} set={set} />
      ))}

      <Pagination key={metadata.totalPages} metadata={metadata} />
    </div>
  );
}
