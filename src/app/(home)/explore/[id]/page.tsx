import { findSetDetail } from "@/actions/fetch-data.action";

type Params = Promise<{ id: string }>;

export default async function PublicSetDetail({ params }: { params: Params }) {
  const { id } = await params;
  const data = await findSetDetail(id, "public");

  if ("statusCode" in data) throw new Error("failed to fetch data");

  return (
    <div>
      <p>{JSON.stringify(data.set.cards)}</p>
    </div>
  );
}
