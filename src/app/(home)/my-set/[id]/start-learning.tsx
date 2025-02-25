"use client";

import { startProgress } from "@/actions/progress/start-progres.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { showErrorBorder } from "@/lib/show-error-border";
import { showErrorDetail } from "@/lib/show-error-detail";
import { cn } from "@/lib/utils";
import {
  StartProgressInputType,
  StartProgressStateType,
} from "@/types/data/progress.type";
import { SetType } from "@/types/data/set.type";
import { ArrowRight, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useActionState, useEffect } from "react";

export function StartLearningBtn({ set }: { set: SetType }) {
  const pathname = usePathname();
  const isMySet = pathname.includes("/my-set");

  const { toast } = useToast();

  const [id, _setId] = useState<string>(set.id);
  const [password, setPassword] = useState<string>(
    isMySet ? "This set is yours so no password's required." : "",
  );
  const [success, setSuccess] = useState<boolean>(false);

  const initState: StartProgressStateType = {
    input: {
      id,
      password,
    } as StartProgressInputType,
    success,
  };

  const [state, action, isLoading] = useActionState<
    StartProgressStateType,
    FormData
  >(startProgress, initState);

  useEffect(() => {
    setSuccess(state.success);

    if (state.error && state.error.details === undefined) {
      toast({
        variant: "destructive",
        title: "Start progress failed.",
        description: state.error?.message,
      });
    }

    if (state.success) {
      toast({
        variant: "default",
        title: "Start progress successful.",
        description:
          "Next step, click 'Go to progress' button to start learning.",
      });
    }
  }, [state, toast]);

  const errorDetails = state.error?.details;

  return (
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
              placeholder="Please enter the password to start learning."
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={1}
              autoFocus
              disabled={isMySet}
            />

            <div className="col-span-3 col-start-2">
              {errorDetails && showErrorDetail(errorDetails, "password")}
            </div>
          </div>

          <DialogFooter>
            <div className="flex items-center gap-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>

              <Button disabled={isLoading} variant="default" type="submit">
                Yes
              </Button>

              <Check
                className={cn(
                  "h-4 w-4",
                  success ? "text-green-500" : "invisible",
                )}
              />
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
