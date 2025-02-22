import { findMySetDetail } from "@/actions/fetch-data.action";

type Params = Promise<{ id: string }>;

export default async function MySetDetail({ params }: { params: Params }) {
  const { id } = await params;
  const set = await findMySetDetail(id);

  if ("statusCode" in set) throw new Error("failed to fetch data");

  return (
    <div>
      <p>{JSON.stringify(set)}</p>
    </div>
  );
}
