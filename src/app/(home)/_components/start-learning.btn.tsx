"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import {
  StartLearningInput,
  startLearningSchema,
  StartLearningState,
} from "@/app/(home)/_types/start-learning.type";
import { StartLearning } from "@/app/(home)/_actions/start-learning";
import { convertToFormData } from "@/lib/convert-formdata";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { showErrorDetail } from "@/lib/show-error-detail";
import { VisibleTo } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function StartLearningBtn({
  setId,
  visibleTo,
}: {
  setId: string;
  visibleTo: VisibleTo;
}) {
  const isSetPublic = visibleTo === VisibleTo.EVERYONE;
  const StartLearningWithSetId = StartLearning.bind(null, setId);
  const [state, formAction, isPending] = useActionState<
    StartLearningState,
    FormData
  >(StartLearningWithSetId, {});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<StartLearningInput>({
    resolver: zodResolver(startLearningSchema),
    defaultValues: {
      passcode: "",
    },
  });

  const errorDetails = state.error?.details;
  const router = useRouter();
  useEffect(() => {
    if (state.error && state.error.details === undefined)
      toast.error(state.error.message);

    if (state.success && state.redirectUrl) {
      toast.success("This set has been successfully added to your library!");
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  function onStartLearning(data: StartLearningInput) {
    startTransition(() => formAction(convertToFormData(data)));
  }

  function handleButtonClick() {
    if (isSetPublic) {
      const formData = new FormData();
      formData.append("passcode", "");
      startTransition(() => formAction(formData));
    } else {
      setIsDialogOpen(true);
    }
  }

  return (
    <>
      <Button
        className="ml-auto mr-4 w-fit"
        variant="outline"
        onClick={handleButtonClick}
      >
        Start learning
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Start learning this set?
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onStartLearning)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="passcode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Input
                          placeholder="Enter set's passcode to start learning"
                          {...field}
                        />
                        {errorDetails &&
                          showErrorDetail(errorDetails, "passcode")}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button disabled={isPending} type="submit">
                  Start
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
