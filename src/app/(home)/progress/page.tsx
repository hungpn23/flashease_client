import { findPaginated } from "@/actions/fetch-data.action";
import { Pagination } from "@/components/clients/pagination";
import { MyProgress } from "@/components/servers/progress";
import { searchParamsCache } from "@/lib/search-params";
import { MyProgressType } from "@/types/data/progress.type";
import { SearchParams } from "nuqs/server";

export default async function Progress({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, take, order } = searchParamsCache.parse(await searchParams);
  const myProgress = await findPaginated<MyProgressType>(
    "/progress/my-progress",
    page,
    take,
    order,
  );

  if ("statusCode" in myProgress) throw new Error("failed to fetch data");

  return (
    <div className="flex flex-col flex-wrap">
      <p className="text-sm text-muted-foreground">
        Click a progress to learn.
      </p>

      {myProgress.data.map((p) => (
        <MyProgress key={p.id} myProgress={p} />
      ))}

      <Pagination
        key={myProgress.metadata.totalPages}
        metadata={myProgress.metadata}
      />
    </div>
  );
}
