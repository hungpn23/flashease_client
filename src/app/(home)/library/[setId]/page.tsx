import { findSet } from "@/actions/set/find-set-detail.action";
import { CardTable } from "@/components/clients/card-table";
import { Params } from "@/types/page-params.type";

export default async function MySetDetail({ params }: { params: Params }) {
  const { setId } = await params;
  const set = await findSet(setId, "library");

  if ("statusCode" in set) throw new Error("failed to fetch set");

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{set.name}</h1>

        {/* {progress ? (
          <Button className="mb-4 ml-auto w-fit" asChild>
            <Link href={`/my-progress/${progress.id}`}>
              Go to progress
              <ArrowRight className="h4 inline w-4" />
            </Link>
          </Button>
        ) : (
          <StartLearningBtn set={set} />
        )} */}
      </div>

      <CardTable initCards={set.cards || []} setId={set.id} />
    </div>
  );
}
