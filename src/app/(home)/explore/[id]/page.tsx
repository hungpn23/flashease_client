import { findPublicSetDetail } from "@/actions/fetch-data.action";

type Params = Promise<{ id: string }>;

export default async function PublicSetDetail({ params }: { params: Params }) {
  const { id } = await params;
  const set = await findPublicSetDetail(id);

  if ("statusCode" in set) throw new Error("failed to fetch data");

  return (
    <div>
      <p>{JSON.stringify(set)}</p>
    </div>
  );
}
