import { Params } from "@/types/page-params.type";

export default async function MyProgressDetail({ params }: { params: Params }) {
  const { id } = await params;

  return <div>{id}</div>;
}
