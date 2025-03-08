"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Container } from "@/components/layouts/container";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateSetInput,
  createSetSchema,
  CreateSetState,
} from "@/types/set/create-set.type";
import { startTransition, useActionState, useEffect } from "react";
import { CreateSet } from "@/actions/set/create-set";
import { convertToFormData } from "@/lib/to-form-data";
import { showErrorDetail } from "@/lib/show-error-detail";
import { cn } from "@/lib/utils";
import { showErrorBorder } from "@/lib/show-error-border";

export default function CreateSetPage() {
  const [state, formAction, isPending] = useActionState<
    CreateSetState,
    FormData
  >(CreateSet, {});
  const form = useForm<CreateSetInput>({
    resolver: zodResolver(createSetSchema),
    defaultValues: {
      name: "",
      description: "",
      visibleTo: VisibleTo.JUST_ME,
      passcode: "",
      cards: [
        { term: "", definition: "" },
        { term: "", definition: "" },
        { term: "", definition: "" },
        { term: "", definition: "" },
      ],
    },
  });
  const visibleTo = form.watch("visibleTo");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  const errorDetails = state.error?.details;

  useEffect(() => {
    if (state.error && state.error.details === undefined)
      toast.error(state.error.message);
  }, [state]);

  function onSubmit(data: CreateSetInput) {
    const hasEmptyFields = data.cards.some(
      ({ term, definition }) => term.trim() === "" || definition.trim() === "",
    );

    if (hasEmptyFields)
      return toast.error("All terms and definitions must be filled");

    startTransition(() => formAction(convertToFormData(data)));
  }

  return (
    <Container className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-semibold">
        Create a new flashcard set
      </h1>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Name</FormLabel>
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
                    <FormLabel className="text-lg">
                      Description (optional)
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Textarea
                          placeholder="Enter set description here"
                          {...field}
                        />

                        {errorDetails &&
                          showErrorDetail(errorDetails, "description")}
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
                    <FormLabel className="text-lg">Visible To</FormLabel>
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
                          <SelectItem value={VisibleTo.JUST_ME}>
                            Just me
                          </SelectItem>
                          <SelectItem value={VisibleTo.PEOPLE_WITH_A_PASSCODE}>
                            People with a password
                          </SelectItem>
                          <SelectItem value={VisibleTo.EVERYONE}>
                            Everyone
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {errorDetails &&
                        showErrorDetail(errorDetails, "visibleTo")}
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

                          {errorDetails &&
                            showErrorDetail(errorDetails, "passcode")}
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
                  <TableHeader>
                    <TableRow className="bg-secondary hover:bg-secondary">
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
                                form.formState.errors.cards?.[index]
                                  ?.definition;

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
                    onClick={() => append({ term: "", definition: "" })}
                  >
                    Add card <Plus className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  disabled={isPending}
                  className="hover:underline"
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}
