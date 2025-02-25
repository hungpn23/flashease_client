import { findSetDetail } from "@/actions/set/find-set-detail.action";
import { StartLearningBtn } from "@/components/clients/start-learning";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Params } from "@/types/page-params.type";
import { ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function MySetDetail({ params }: { params: Params }) {
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

      <Table>
        <TableCaption>A list of your cards.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">No.</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Definition</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {setDetail.set.cards.map((card, index) => (
            <TableRow key={card.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{card.term}</TableCell>
              <TableCell>{card.definition}</TableCell>
              <TableCell>
                <Trash2 className="mx-auto h-4 w-4" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total cards</TableCell>
            <TableCell className="text-right">
              {setDetail.set.cards.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
