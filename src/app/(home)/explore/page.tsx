import { findPaginated } from "@/actions/find-paginated.action";
import { Pagination } from "@/components/clients/pagination";
import { Set } from "@/components/servers/set";
import { searchParamsCache } from "@/lib/search-params";
import { SetType } from "@/types/data/set.type";
import { SearchParams } from "nuqs/server";

export default async function Explore({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, take, order } = searchParamsCache.parse(await searchParams);
  const publicSets = await findPaginated<SetType>(
    "/set/public",
    page,
    take,
    order,
  );

  if ("statusCode" in publicSets) throw new Error("failed to fetch data");

  return (
    <div className="flex flex-col flex-wrap">
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
