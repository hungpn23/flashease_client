"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VisibleTo } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useTransition } from "react";
import { convertToFormData } from "@/lib/to-form-data";
import { showErrorDetail } from "@/lib/show-error-detail";
import { cn } from "@/lib/utils";
import { showErrorBorder } from "@/lib/show-error-border";
import { EditSet } from "@/actions/set/edit-set";
import {
  EditSetInput,
  editSetSchema,
  EditSetState,
} from "@/types/set/edit-set.type";
import { Set } from "@/types/set";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { DeleteSet } from "@/actions/set/delete-set";

export function EditSetForm({ set }: { set: Set }) {
  const EditSetWithSetId = EditSet.bind(null, set.id);
  const [state, formAction, isPending] = useActionState<EditSetState, FormData>(
    EditSetWithSetId,
    {},
  );
  const form = useForm<EditSetInput>({
    resolver: zodResolver(editSetSchema),
    defaultValues: {
      name: set.name,
      description: set.description || "",
      visibleTo: set.visibleTo,
      passcode: set.passcode || "",
      cards: set.cards,
    },
  });
  const visibleTo = form.watch("visibleTo");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cards",
  });
  const [isDeleting, startTransition] = useTransition();
  const errorDetails = state.error?.details;

  useEffect(() => {
    if (state.error && state.error.details === undefined)
      toast.error(state.error.message);

    if (state.success) toast.success("Set updated successfully!");
  }, [state]);

  function onSubmit(data: EditSetInput) {
    const hasEmptyFields = data.cards.some(
      ({ term, definition }) => term.trim() === "" || definition.trim() === "",
    );

    if (hasEmptyFields)
      return toast.error("All terms and definitions must be filled");

    startTransition(() => formAction(convertToFormData(data)));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Name</FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="bg-background"
                    placeholder="Enter set name here"
                    {...field}
                  />

                  {errorDetails && showErrorDetail(errorDetails, "name")}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                Description (optional)
              </FormLabel>
              <FormControl>
                <div>
                  <Textarea
                    placeholder="Enter set description here"
                    {...field}
                  />

                  {errorDetails && showErrorDetail(errorDetails, "description")}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Visible To */}
        <FormField
          control={form.control}
          name="visibleTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Visible To</FormLabel>
              <div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={VisibleTo.JUST_ME}>Just me</SelectItem>
                    <SelectItem value={VisibleTo.PEOPLE_WITH_A_PASSCODE}>
                      People with a password
                    </SelectItem>
                    <SelectItem value={VisibleTo.EVERYONE}>Everyone</SelectItem>
                  </SelectContent>
                </Select>

                {errorDetails && showErrorDetail(errorDetails, "visibleTo")}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passcode - Only shown when visibleTo is PEOPLE_WITH_A_PASSCODE */}
        {visibleTo === VisibleTo.PEOPLE_WITH_A_PASSCODE && (
          <FormField
            control={form.control}
            name="passcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter your passcode"
                      {...field}
                    />

                    {errorDetails && showErrorDetail(errorDetails, "passcode")}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Cards Table */}
        <div>
          <Table className="overflow-hidden">
            <TableHeader className="bg-secondary hover:bg-secondary">
              <TableRow>
                <TableHead className="w-10">No.</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Definition</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`cards.${index}.term`}
                      render={({ field }) => {
                        const hasError =
                          form.formState.errors.cards?.[index]?.term;

                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                className={cn(
                                  hasError
                                    ? "border-destructive focus-visible:ring-destructive"
                                    : "",
                                  errorDetails &&
                                    showErrorBorder(
                                      errorDetails,
                                      `cards.${index}.term`,
                                    ),
                                )}
                                placeholder={`term ${index + 1}`}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`cards.${index}.definition`}
                      render={({ field }) => {
                        const hasError =
                          form.formState.errors.cards?.[index]?.definition;

                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                className={cn(
                                  hasError
                                    ? "border-destructive focus-visible:ring-destructive"
                                    : "",
                                  errorDetails &&
                                    showErrorBorder(
                                      errorDetails,
                                      `cards.${index}.definition`,
                                    ),
                                )}
                                placeholder={`def ${index + 1}`}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        fields.length > 4
                          ? remove(index)
                          : toast.error("You need at least 4 cards");
                      }}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex items-center justify-between">
            <p className="font-medium">Total cards: {fields.length}</p>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                append({
                  term: "",
                  definition: "",
                });
              }}
            >
              Add card <Plus className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-4">
            <Button
              className="border-destructive text-destructive hover:bg-destructive"
              type="button"
              variant="outline"
              disabled={isDeleting}
              onClick={() =>
                startTransition(async () => {
                  const success = await DeleteSet(set.id);
                  if (!success) toast.error("Failed to delete set");
                })
              }
            >
              Delete <Trash2 className="inline h-4 w-4" />
            </Button>

            <div className="flex gap-4">
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
