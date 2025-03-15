"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { startTransition, useActionState, useEffect } from "react";
import { convertToFormData } from "@/lib/convert-formdata";
import { showErrorDetail } from "@/lib/show-error-detail";
import { EditProfile } from "@/app/profile/_actions/edit-profile";
import {
  EditProfileInput,
  editProfileSchema,
  EditProfileState,
} from "@/app/profile/_types/edit-profile.type";
import { User } from "@/types/data/user";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

export function EditProfileForm({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState<
    EditProfileState,
    FormData
  >(EditProfile, {});
  const form = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });
  const errorDetails = state.error?.details;

  useEffect(() => {
    if (state.error && state.error.details === undefined)
      toast.error(state.error.message);

    if (state.success) toast.success("User updated successfully!");
  }, [state]);

  function onSubmit(data: EditProfileInput) {
    startTransition(() => formAction(convertToFormData(data)));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Username</FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="bg-background"
                    placeholder="Enter username here"
                    {...field}
                  />

                  {errorDetails && showErrorDetail(errorDetails, "username")}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="bg-background"
                    placeholder="Enter email here"
                    {...field}
                  />

                  {errorDetails && showErrorDetail(errorDetails, "email")}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Bio (optional)</FormLabel>
              <FormControl>
                <div>
                  <Textarea placeholder="Enter user bio here" {...field} />

                  {errorDetails && showErrorDetail(errorDetails, "bio")}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-4">
            <div className="ml-auto flex gap-4">
              <DialogClose asChild>
                <Button disabled={isPending} type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>

              <Button disabled={isPending} type="submit">
                Save changes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}
