import { findSetDetail } from "@/actions/set/find-set-detail.action";
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

export default async function MySetDetail({ params }: { params: Params }) {
  const { id } = await params;
  const set = await findSetDetail(id, "my-set");

  if ("statusCode" in set) throw new Error("failed to fetch set");

  return (
    <div className="flex flex-col">
      <Button className="mb-4 ml-auto w-fit">
        {set.isLearning ? "Go to progress" : "Start learning"}{" "}
        <ArrowRight className="h4 w-4" />
      </Button>

      <Table>
        <TableCaption>
          A list of your cards. | isLearning: {set.isLearning.toString()}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">No.</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Definition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {set.cards.map((card, index) => (
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
            <TableCell className="text-right">{set.cards.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
