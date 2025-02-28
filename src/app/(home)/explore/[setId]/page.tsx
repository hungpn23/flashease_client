import { findSet } from "@/actions/set/find-set-detail.action";
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
  const set = await findSet(setId, "public-sets");

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
            <TableRow key={card.id}>
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
