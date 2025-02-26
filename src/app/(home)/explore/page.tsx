import { findPaginated } from "@/actions/find-paginated.action";
import { Pagination } from "@/components/clients/pagination";
import { Set } from "@/components/servers/set";
import { searchParamsCache } from "@/lib/search-params";
import { TSet } from "@/types/data/set.type";
import { SearchParams } from "nuqs/server";

export default async function Explore({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, take, order } = searchParamsCache.parse(await searchParams);
  const publicSets = await findPaginated<TSet>(
    "/set/public",
    page,
    take,
    order,
  );

  if ("statusCode" in publicSets) throw new Error("failed to fetch data");

  return (
    <div className="flex flex-col flex-wrap">
      <p className="text-sm text-muted-foreground">
        Click a set see cards and start learning.
      </p>

      {publicSets.data.map((set) => (
        <Set path="explore" key={set.id} set={set} />
      ))}

      <Pagination
        key={publicSets.metadata.totalPages}
        metadata={publicSets.metadata}
      />
    </div>
  );
}
