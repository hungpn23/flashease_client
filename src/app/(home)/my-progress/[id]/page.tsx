import { findProgressDetail } from "@/actions/progress/find-progress-detail.action";
import { Params } from "@/types/page-params.type";

export default async function MyProgressDetail({ params }: { params: Params }) {
  const { id } = await params;
  const res = await findProgressDetail(id);
  console.log("🚀 ~ MyProgressDetail ~ res:", res);

  if ("statusCode" in res) throw new Error("failed to fetch progress");

  return <div>{JSON.stringify(res)}</div>;
}
