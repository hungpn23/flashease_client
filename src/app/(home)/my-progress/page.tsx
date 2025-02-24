import { findPaginated } from "@/actions/find-paginated.action";
import { Pagination } from "@/components/clients/pagination";
import { ProgressWithMetadata } from "@/components/servers/progress";
import { searchParamsCache } from "@/lib/search-params";
import { ProgressWithMetadataType } from "@/types/data/progress.type";
import { SearchParams } from "nuqs/server";

export default async function MyProgress({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, take, order } = searchParamsCache.parse(await searchParams);
  const res = await findPaginated<ProgressWithMetadataType>(
    "/progress/my-progress",
    page,
    take,
    order,
  );

  if ("statusCode" in res) throw new Error("failed to fetch data");

  return (
    <div className="flex flex-col flex-wrap">
      <p className="text-sm text-muted-foreground">
        Click a progress to learn.
      </p>

      {res.data.map((item) => (
        <ProgressWithMetadata key={item.progress.id} item={item} />
      ))}

      <Pagination key={res.metadata.totalPages} metadata={res.metadata} />
    </div>
  );
}
