import { findPaginated } from "@/actions/find-paginated.action";
import { Pagination } from "@/components/clients/pagination";
import { Set } from "@/components/servers/set";
import { searchParamsCache } from "@/lib/search-params";
import { SetType } from "@/types/data/set.type";
import { SearchParams } from "nuqs/server";

export default async function MySet({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, take, order } = searchParamsCache.parse(await searchParams);
  const mySets = await findPaginated<SetType>("/set/my-set", page, take, order);

  if ("statusCode" in mySets) throw new Error("failed to fetch data");

  return (
    <div className="flex flex-col flex-wrap">
      <p className="text-sm text-muted-foreground">
        Click a set to add/remove cards and start learning.
      </p>

      {mySets.data.map((set) => (
        <Set path="my-set" key={set.id} set={set} />
      ))}

      <Pagination key={mySets.metadata.totalPages} metadata={mySets.metadata} />
    </div>
  );
}
