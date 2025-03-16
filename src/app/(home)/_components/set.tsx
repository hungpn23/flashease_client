import Link from "next/link";
import { Pencil } from "lucide-react";
import { Set, SetMetadata } from "@/types/data/set.type";
import { EditSetForm } from "./edit-set.form";
import { Visibility } from "@/app/(home)/_components/visibility";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SetUI({
  set,
  metadata,
  path,
}: {
  set: Set;
  metadata?: SetMetadata;
  path: "library" | "explore";
}) {
  const isLibrary = path === "library";

  return (
    <article className="flex items-center justify-between border-b border-dashed border-primary px-4 py-2 last:border-none hover:bg-secondary/25">
      <Link className="w-full" href={`/${path}/${set.id}`}>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold hover:underline hover:underline-offset-4">
            {set.name}
          </span>

          <Visibility visibleTo={set.visibleTo} />
        </div>

        {!isLibrary && (
          <p className="text-sm text-muted-foreground">
            {set.description || ""}
          </p>
        )}

        {metadata && (
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Total cards: {metadata.totalCards}</span>
            <span className="mx-1">•</span>
            <span>Not studied: {metadata.notStudiedCount}</span>
            <span className="mx-1">•</span>
            <span>Learning: {metadata.learningCount}</span>
            <span className="mx-1">•</span>
            <span>Known: {metadata.knownCount}</span>
          </div>
        )}

        <div className="mt-2 text-sm text-muted-foreground">
          {!isLibrary && (
            <span>
              <span>Author: {set.author}</span>
              <span className="mx-1">•</span>
              <span>Total cards: {set.cards?.length ?? 0}</span>
            </span>
          )}
        </div>
      </Link>

      {isLibrary ? (
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
      ) : null}
    </article>
  );
}
