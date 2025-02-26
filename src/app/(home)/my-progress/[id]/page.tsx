import { findProgressDetail } from "@/actions/progress/find-progress-detail.action";
import { TParams } from "@/types/page-params.type";

export default async function MyProgressDetail({
  params,
}: {
  params: TParams;
}) {
  const { id } = await params;
  const res = await findProgressDetail(id);

  if ("statusCode" in res) throw new Error("failed to fetch progress");

  return <div>{JSON.stringify(res)}</div>;
}
