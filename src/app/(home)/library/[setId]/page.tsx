import { LoadSet } from "@/actions/set/load-set";
import { EditSetForm } from "@/components/clients/edit-set-form";
import { FlashcardBtn } from "@/components/clients/flashcard-btn";
import { ResetFlashcardBtn } from "@/components/clients/reset-flashcard";
import { Button } from "@/components/ui/button";
import {
  Card as CardComponent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCardsStatus } from "@/lib/get-cards-status";
import { Card } from "@/types/data/card.type";
import { Params } from "@/types/page-params.type";
import { BookCheck, NotebookPen, Pencil } from "lucide-react";

export default async function SetDetailPage({ params }: { params: Params }) {
  const { setId } = await params;
  const set = await LoadSet(setId, "library");
  if ("statusCode" in set) throw new Error("failed to fetch set");

  const { known, learning, notStudied } = getCardsStatus(set.cards);
  const renderCards = (cards: Card[], startIndex: number) => {
    return cards.map((card, index) => (
      <TableRow key={index}>
        <TableCell>{startIndex + index + 1}</TableCell>
        <TableCell>{card.term}</TableCell>
        <TableCell>{card.definition}</TableCell>
      </TableRow>
    ));
  };

  return (
    <CardComponent>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{set.name}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <div>
            <span>Author: {set.author}</span>
            <span className="mx-1">•</span>
            <span>{set.description || "No description provided."}</span>
          </div>

          <ResetFlashcardBtn setId={setId} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-row items-center gap-4 overflow-x-auto">
          <FlashcardBtn set={set} known={known.length} />

          <Button variant="outline">
            Learn <NotebookPen className="inline h-4 w-4" />
          </Button>

          <Button variant="outline">
            Test <BookCheck className="inline h-4 w-4" />
          </Button>

          <Button variant="outline">Coming soon...</Button>
        </div>

        <Table className="mt-8">
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="w-14">No.</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Definition</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="font-medium">
                Known ({known.length})
              </TableCell>
            </TableRow>
            {renderCards(known, 0)}

            <TableRow>
              <TableCell colSpan={3} className="font-medium">
                Learning ({learning.length})
              </TableCell>
            </TableRow>
            {renderCards(learning, known.length)}

            <TableRow>
              <TableCell colSpan={3} className="font-medium">
                Not Studied ({notStudied.length})
              </TableCell>
            </TableRow>
            {renderCards(notStudied, known.length + learning.length)}
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

      <CardFooter className="justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mr-4" variant="outline">
              Edit <Pencil className="inline h-4 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[80vh] overflow-scroll sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Edit set
              </DialogTitle>

              <DialogDescription>
                Note, this process will be reset from the beginning if you make
                any changes!
              </DialogDescription>
            </DialogHeader>

            <EditSetForm set={set} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </CardComponent>
  );
}
