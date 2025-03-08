import Link from "next/link";
import { Visibility } from "./visibility";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Set, SetMetadata } from "@/types/set";
import { EditSetForm } from "../clients/edit-set-form";

export function SetComponent({
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
    <article className="flex items-center justify-between border-b border-dashed border-gray-500 py-4 first:pt-0 last:border-none">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${path}/${set.id}`}
            className="text-xl font-semibold text-heading hover:underline hover:underline-offset-4"
          >
            {set.name}
          </Link>

          <Visibility visibleTo={set.visibleTo} />
        </div>

        {metadata && (
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="text-foreground">
              Total cards: {metadata.totalCards}
            </span>
            <span className="mx-1">•</span>
            <span className="text-heading">
              Not studied: {metadata.notStudiedCount}
            </span>
            <span className="mx-1">•</span>
            <span className="text-link">
              Learning: {metadata.learningCount}
            </span>
            <span className="mx-1">•</span>
            <span className="text-highlight">Known: {metadata.knownCount}</span>
          </div>
        )}

        <div className="mt-2 text-sm">
          <span className="text-muted-foreground">Author: {set.author}</span>
          {!isLibrary && (
            <span>
              <span className="mx-1">•</span>
              <span className="text-foreground">
                Total cards: {set.cards?.length ?? 0}
              </span>
            </span>
          )}
        </div>
      </div>

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
