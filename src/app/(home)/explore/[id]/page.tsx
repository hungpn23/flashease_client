import { findSetDetail } from "@/actions/set/find-set-detail.action";

type Params = Promise<{ id: string }>;

export default async function PublicSetDetail({ params }: { params: Params }) {
  const { id } = await params;
  const res = await findSetDetail(id, "public");

  if ("statusCode" in res) throw new Error("failed to fetch set");

  return (
    <div>
      <p>{JSON.stringify(res.set.cards)}</p>
    </div>
  );
}
