"use client";

import { startProgress } from "@/actions/progress/start-progres.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisibleTo } from "@/lib/constants";
import { showErrorBorder } from "@/lib/show-error-border";
import { showErrorDetail } from "@/lib/show-error-detail";
import { cn } from "@/lib/utils";
import {
  TStartProgressInput,
  TStartProgressState,
} from "@/types/data/progress.type";
import { TSet } from "@/types/data/set.type";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export function StartLearningBtn({ set }: { set: TSet }) {
  const pathname = usePathname();
  const isPasswordOptional =
    pathname.includes("/my-set") || set.visibleTo === VisibleTo.EVERYONE;

  const [id] = useState<string>(set.id);
  const [password, setPassword] = useState<string>("");

  const initState: TStartProgressState = {
    input: {
      id,
      password,
    } as TStartProgressInput,
    error: undefined,
  };

  const [state, action, isLoading] = useActionState<
    TStartProgressState,
    FormData
  >(startProgress, initState);

  useEffect(() => {
    if (state.error && state.error.details === undefined)
      toast.error(state.error?.message);
  }, [state]);

  const errorDetails = state.error?.details;

  return isPasswordOptional ? (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="password" value={password} />

      <Button className="mb-4 ml-auto w-fit" disabled={isLoading} type="submit">
        Start learning
        <ArrowRight className="h4 inline w-4" />
      </Button>
    </form>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4 ml-auto w-fit">
          Start learning
          <ArrowRight className="h4 inline w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>

        <form className="grid gap-2 py-4" action={action}>
          <input type="hidden" name="id" value={id} />

          {/* Password */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>

            <Input
              className={cn(
                "col-span-3",
                errorDetails && showErrorBorder(errorDetails, "password"),
              )}
              name="password"
              type="text"
              value={password}
              placeholder="Enter the password to start learning."
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={1}
              autoFocus
            />

            <div className="col-span-3 col-start-2">
              {errorDetails && showErrorDetail(errorDetails, "password")}
            </div>
          </div>

          <DialogFooter>
            <div className="flex items-center gap-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  No
                </Button>
              </DialogClose>

              <Button disabled={isLoading} variant="default" type="submit">
                Yes
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
