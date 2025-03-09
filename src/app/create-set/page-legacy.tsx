"use client";

import type React from "react";

import {
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Import, Plus, Trash2 } from "lucide-react";
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
  type CreateSetInput,
  createSetSchema,
  type CreateSetState,
} from "@/types/set/create-set.type";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { CreateSet } from "@/actions/set/create-set";
import { convertToFormData } from "@/lib/to-form-data";
import { showErrorDetail } from "@/lib/show-error-detail";
import { cn } from "@/lib/utils";
import { showErrorBorder } from "@/lib/show-error-border";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

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

  const [previewData, setPreviewData] = useState<
    { term: string; definition: string }[]
  >([]);

  const [importText, setImportText] = useState("");
  const [termSeparator, setTermSeparator] = useState("tab");
  const [cardSeparator, setCardSeparator] = useState("newline");
  const [customTermSeparator, setCustomTermSeparator] = useState(":");
  const [customCardSeparator, setCustomCardSeparator] = useState("\n\n");

  /**
   * Hàm chuyển đổi đoạn text thành mảng { term, definition }.
   */
  function parseFlashcards(
    input: string,
    termDefSeparator: string,
    cardSeparator: string,
  ): { term: string; definition: string }[] {
    if (!input.trim()) return [];

    // Chuyển đổi các giá trị separator thành ký tự thực tế
    let actualTermSeparator = termDefSeparator;
    if (termDefSeparator === "tab") actualTermSeparator = "\t";
    if (termDefSeparator === "comma") actualTermSeparator = ",";
    if (termDefSeparator === "custom")
      actualTermSeparator = customTermSeparator;

    let actualCardSeparator = cardSeparator;
    if (cardSeparator === "newline") actualCardSeparator = "\n";
    if (cardSeparator === "semicolon") actualCardSeparator = ";";
    if (cardSeparator === "custom") actualCardSeparator = customCardSeparator;

    // Tách toàn bộ input thành các "card" dựa trên cardSeparator
    const rawCards = input.split(actualCardSeparator);

    // Duyệt qua từng card, tách tiếp để lấy term và definition
    return rawCards
      .filter((card) => card.trim())
      .map((card, index) => {
        // Tách thành 2 phần: term và definition
        const [rawTerm, rawDefinition] = card.split(actualTermSeparator);

        // Trim để loại bỏ khoảng trắng thừa (nếu có)
        const term = rawTerm?.trim() ?? "";
        const definition = rawDefinition?.trim() ?? "";

        return { term, definition };
      })
      .filter(({ term, definition }) => term !== "" || definition !== "");
  }

  const handleImportTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const text = e.target.value;
    setImportText(text);

    // Parse dữ liệu và cập nhật preview
    const parsedCards = parseFlashcards(text, termSeparator, cardSeparator);
    setPreviewData(parsedCards);
  };

  const handleCustomTermSeparatorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const separator = e.target.value;
    setCustomTermSeparator(separator);

    // Cập nhật preview nếu đang sử dụng custom term-def separator
    if (termSeparator === "custom" && importText) {
      const parsedCards = parseFlashcards(importText, "custom", cardSeparator);
      setPreviewData(parsedCards);
    }
  };

  const handleCustomCardSeparatorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const separator = e.target.value;
    setCustomCardSeparator(separator);

    // Cập nhật preview nếu đang sử dụng custom card separator
    if (cardSeparator === "custom" && importText) {
      const parsedCards = parseFlashcards(importText, termSeparator, "custom");
      setPreviewData(parsedCards);
    }
  };

  const handleTermSeparatorChange = (value: string) => {
    setTermSeparator(value);

    // Cập nhật preview với term-def separator mới
    if (importText) {
      const parsedCards = parseFlashcards(importText, value, cardSeparator);
      setPreviewData(parsedCards);
    }
  };

  const handleCardSeparatorChange = (value: string) => {
    setCardSeparator(value);

    // Cập nhật preview với card separator mới
    if (importText) {
      const parsedCards = parseFlashcards(importText, termSeparator, value);
      setPreviewData(parsedCards);
    }
  };

  // Xử lý khi người dùng nhấn nút Import
  const handleImport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Parse flashcards từ input text
    const parsedCards = parseFlashcards(
      importText,
      termSeparator,
      cardSeparator,
    );

    // Kiểm tra nếu không có cards nào được parse
    if (parsedCards.length === 0)
      return toast.error("No valid cards found to import");

    // Thêm các cards mới vào fields
    append(parsedCards);

    console.log("Current form values:", form.getValues("cards"));

    // Hiển thị thông báo thành công
    toast.success(`Imported ${parsedCards.length} cards successfully`);

    // Reset form import
    setImportText("");
    setPreviewData([]);

    // Đóng dialog
    if (dialogCloseRef.current) {
      dialogCloseRef.current.click();
    }
  };

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

                  <div className="flex gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline">
                          Import <Import className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-h-[80vh] overflow-scroll sm:max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold">
                            Import cards
                          </DialogTitle>

                          <DialogDescription>
                            Import your data. Copy and Paste your data here
                            (from Word, Excel, Google Docs, etc.)
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 space-y-6">
                          {/* Import Textarea */}
                          <div className="space-y-2">
                            <Textarea
                              className="text-sm"
                              placeholder="Paste your data here"
                              value={importText}
                              onChange={handleImportTextChange}
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Between term and definition */}
                            <div className="space-y-4">
                              <Label className="text-base font-medium">
                                Between term and definition
                              </Label>
                              <RadioGroup
                                defaultValue="tab"
                                value={termSeparator}
                                onValueChange={handleTermSeparatorChange}
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="tab" id="tab" />
                                    <Label
                                      htmlFor="tab"
                                      className="font-normal"
                                    >
                                      Tab
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="comma" id="comma" />
                                    <Label
                                      htmlFor="comma"
                                      className="font-normal"
                                    >
                                      Comma
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <RadioGroupItem
                                      value="custom"
                                      id="custom"
                                    />
                                    <Label
                                      htmlFor="custom"
                                      className="font-normal"
                                    >
                                      Custom
                                    </Label>
                                    <Input
                                      className="h-8 w-32"
                                      placeholder=":"
                                      value={customTermSeparator}
                                      onChange={handleCustomTermSeparatorChange}
                                      disabled={termSeparator !== "custom"}
                                    />
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>

                            {/* Between cards */}
                            <div className="space-y-4">
                              <Label className="text-base font-medium">
                                Between cards
                              </Label>
                              <RadioGroup
                                defaultValue="newline"
                                value={cardSeparator}
                                onValueChange={handleCardSeparatorChange}
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="newline"
                                      id="newline"
                                    />
                                    <Label
                                      htmlFor="newline"
                                      className="font-normal"
                                    >
                                      New line
                                    </Label>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="semicolon"
                                      id="semicolon"
                                    />
                                    <Label
                                      htmlFor="semicolon"
                                      className="font-normal"
                                    >
                                      Semicolon
                                    </Label>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                    <RadioGroupItem
                                      value="custom"
                                      id="card-custom"
                                    />
                                    <Label
                                      htmlFor="card-custom"
                                      className="font-normal"
                                    >
                                      Custom
                                    </Label>
                                    <Input
                                      className="h-8 w-32"
                                      placeholder="\n\n"
                                      value={customCardSeparator}
                                      onChange={handleCustomCardSeparatorChange}
                                      disabled={cardSeparator !== "custom"}
                                    />
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>

                          {/* Preview section */}
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              Preview{" "}
                              <span className="text-sm font-normal text-muted-foreground">
                                {previewData.length} cards
                              </span>
                            </h3>

                            <Table>
                              <TableHeader>
                                <TableRow className="bg-secondary hover:bg-secondary">
                                  <TableHead className="w-10">No.</TableHead>
                                  <TableHead>Term</TableHead>
                                  <TableHead>Definition</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {previewData.map((card, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{card.term}</TableCell>
                                    <TableCell>{card.definition}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>

                          <DialogFooter>
                            <div className="flex gap-4">
                              <DialogClose asChild>
                                <Button
                                  ref={dialogCloseRef}
                                  type="button"
                                  variant="secondary"
                                >
                                  Close
                                </Button>
                              </DialogClose>

                              <Button
                                type="button"
                                onClick={handleImport}
                                disabled={previewData.length === 0}
                              >
                                Import <Import className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </DialogFooter>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append({ term: "", definition: "" })}
                    >
                      Add card <Plus className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
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
