import { findMySets } from "@/actions/fetch-data.action";
import { Pagination } from "@/components/clients/pagination";
import { Set } from "@/components/servers/set";
import { searchParamsCache } from "@/lib/search-params";
import { SearchParams } from "nuqs/server";

export default async function MySets({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, take, order } = searchParamsCache.parse(await searchParams);
  const mySets = await findMySets(page, take, order);

  if ("statusCode" in mySets) throw new Error("failed to fetch data");

  return (
    <div className="flex flex-col flex-wrap">
      {mySets.data.map((set) => (
        <Set key={set.id} set={set} />
      ))}

      <Pagination key={mySets.metadata.totalPages} metadata={mySets.metadata} />
    </div>
  );
}
