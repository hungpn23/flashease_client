import { formatDate } from "@/lib/format-date";
import Link from "next/link";
import { Visibility } from "./visibility";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { EditSetForm } from "../clients/edit-set-form";
import { SetType } from "@/types/data/set.type";

export function Set({
  set,
  path,
}: {
  set: SetType;
  path: "my-set" | "explore";
}) {
  return (
    <article className="flex items-center justify-between border-b border-dashed border-gray-500 py-4 first:pt-0 last:border-none">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${path}/${set.id}`}
            className="text-heading text-xl font-semibold hover:underline hover:underline-offset-4"
          >
            {set.name}
          </Link>

          <Visibility visibleTo={set.visibleTo} />
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          <span>Author: {set.user.username}</span>
          <span className="mx-1">•</span>
          <time>{formatDate(set.createdAt)}</time>
        </div>
      </div>

      {path === "my-set" ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mr-4" variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Edit set</DialogTitle>

              <DialogDescription>
                Make changes to your set here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <EditSetForm set={set} />
          </DialogContent>
        </Dialog>
      ) : null}
    </article>
  );
}
