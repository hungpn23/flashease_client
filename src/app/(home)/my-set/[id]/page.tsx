import { findSetDetail } from "@/actions/set/find-set-detail.action";
import { CardTable } from "@/components/clients/card-table";
import { StartLearningBtn } from "@/components/clients/start-learning";
import { Button } from "@/components/ui/button";
import { TParams } from "@/types/page-params.type";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function MySetDetail({ params }: { params: TParams }) {
  const { id } = await params;
  const setDetail = await findSetDetail(id, "my-set");

  if ("statusCode" in setDetail) throw new Error("failed to fetch set");

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{setDetail.set.name}</h1>

        {setDetail.progress ? (
          <Button className="mb-4 ml-auto w-fit" asChild>
            <Link href={`/my-progress/${setDetail.progress.id}`}>
              Go to progress
              <ArrowRight className="h4 inline w-4" />
            </Link>
          </Button>
        ) : (
          <StartLearningBtn set={setDetail.set} />
        )}
      </div>

      <CardTable cards={setDetail.set.cards} setId={setDetail.set.id} />
    </div>
  );
}
