import { findSet } from "@/actions/set/load-set";
import {
  TableCaption,
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
  const set = await findSet(setId, "explore");

  if ("statusCode" in set) throw new Error("failed to fetch set");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">{set.name}</h1>

      <p className="text-sm text-muted-foreground">{set.description}</p>

      <Table>
        <TableCaption>A list of your cards.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">No.</TableHead>
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
            <TableCell className="text-right">{set.cards?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
