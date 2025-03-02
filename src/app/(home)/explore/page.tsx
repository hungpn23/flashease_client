import { findPaginated } from "@/actions/find-paginated.action";
import { Pagination } from "@/components/clients/pagination";
import { SetComponent } from "@/components/servers/set";
import { searchParamsCache } from "@/lib/search-params";
import { Set } from "@/types/set";
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
      <p className="text-sm text-muted-foreground">
        Click a set see cards and start learning.
      </p>

      {data.map((set) => (
        <SetComponent path="explore" key={set.id} set={set} />
      ))}

      <Pagination key={metadata.totalPages} metadata={metadata} />
    </div>
  );
}
