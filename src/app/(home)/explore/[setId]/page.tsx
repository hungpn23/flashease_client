import { LoadSet } from "@/app/(home)/_actions/load-set";
import { StartLearningBtn } from "@/app/(home)/_components/start-learning.btn";
import {
  Card as CardUI,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import { Params } from "@/types/page-params.type";

export default async function PublicSetDetail({ params }: { params: Params }) {
  const { setId } = await params;
  const set = await LoadSet(setId, "explore");
  if ("statusCode" in set) throw new Error("failed to fetch set");

  return (
    <CardUI>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{set.name}</CardTitle>
        <CardDescription>
          <span>Author: {set.author}</span>
          <span className="mx-1">•</span>
          <span>{set.description}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col">
        <StartLearningBtn setId={set.id} visibleTo={set.visibleTo} />

        <Table className="mt-8">
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary">
              <TableHead className="w-14">No.</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Definition</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {set.cards?.map((card, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{card.term}</TableCell>
                <TableCell>{card.definition}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total cards</TableCell>
              <TableCell className="text-right">
                {set.cards?.length || 0}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </CardUI>
  );
}
