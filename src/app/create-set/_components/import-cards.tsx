"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  ImportFormInput,
  importFormSchema,
} from "@/app/create-set/_types/import-cards.type";

interface ImportCardsDialogProps {
  onImport: (cards: { term: string; definition: string }[]) => void;
}

export function ImportCards({ onImport }: ImportCardsDialogProps) {
  const importForm = useForm<ImportFormInput>({
    resolver: zodResolver(importFormSchema),
    defaultValues: {
      importText: "",
      termSeparator: "tab",
      cardSeparator: "newline",
      customTermSeparator: ":",
      customCardSeparator: "\n\n",
    },
  });

  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const [previewData, setPreviewData] = useState<
    { term: string; definition: string }[]
  >([]);

  const importText = importForm.watch("importText");
  const termSeparator = importForm.watch("termSeparator");
  const cardSeparator = importForm.watch("cardSeparator");
  const customTermSeparator = importForm.watch("customTermSeparator");
  const customCardSeparator = importForm.watch("customCardSeparator");

  useEffect(() => {
    if (importText) {
      const parsedCards = parseFlashcards(
        importText,
        termSeparator,
        cardSeparator,
        customTermSeparator,
        customCardSeparator,
      );
      setPreviewData(parsedCards);
    } else {
      setPreviewData([]);
    }
  }, [
    importText,
    termSeparator,
    cardSeparator,
    customTermSeparator,
    customCardSeparator,
  ]);

  function parseFlashcards(
    input: string,
    termDefSeparator: string,
    cardSeparator: string,
    customTermSep: string,
    customCardSep: string,
  ): { term: string; definition: string }[] {
    if (!input.trim()) return [];

    let actualTermSeparator = termDefSeparator;
    if (termDefSeparator === "tab") actualTermSeparator = "\t";
    if (termDefSeparator === "comma") actualTermSeparator = ",";
    if (termDefSeparator === "custom") actualTermSeparator = customTermSep;

    let actualCardSeparator = cardSeparator;
    if (cardSeparator === "newline") actualCardSeparator = "\n";
    if (cardSeparator === "semicolon") actualCardSeparator = ";";
    if (cardSeparator === "custom") actualCardSeparator = customCardSep;

    const rawCards = input.split(actualCardSeparator);

    return rawCards
      .filter((card) => card.trim())
      .map((card) => {
        const [rawTerm, rawDefinition] = card.split(actualTermSeparator);
        const term = rawTerm?.trim() ?? "";
        const definition = rawDefinition?.trim() ?? "";
        return { term, definition };
      })
      .filter(({ term, definition }) => term !== "" || definition !== "");
  }

  const handleImport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formValues = importForm.getValues();
    const parsedCards = parseFlashcards(
      formValues.importText,
      formValues.termSeparator,
      formValues.cardSeparator,
      formValues.customTermSeparator,
      formValues.customCardSeparator,
    );

    if (parsedCards.length === 0) {
      toast.error("No valid cards found to import");
      return;
    }

    onImport(parsedCards);

    importForm.reset({
      importText: "",
      termSeparator: "tab",
      cardSeparator: "newline",
      customTermSeparator: ":",
      customCardSeparator: "\n\n",
    });
    setPreviewData([]);

    dialogCloseRef.current?.click();
  };

  return (
    <DialogContent className="max-h-[80vh] overflow-scroll sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Import cards
        </DialogTitle>
        <DialogDescription>
          Import your data. Copy and Paste your data here (from Word, Excel,
          Google Docs, etc.)
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-6">
        <Form {...importForm}>
          <form className="space-y-6">
            {/* Import Textarea */}
            <FormField
              control={importForm.control}
              name="importText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="text-sm"
                      placeholder="Paste your data here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Between term and definition */}
              <div className="space-y-4">
                <Label className="text-base font-medium">
                  Between term and definition
                </Label>
                <FormField
                  control={importForm.control}
                  name="termSeparator"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="tab" id="tab" />
                              <Label htmlFor="tab" className="font-normal">
                                Tab
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="comma" id="comma" />
                              <Label htmlFor="comma" className="font-normal">
                                Comma
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="custom" id="custom" />
                              <Label htmlFor="custom" className="font-normal">
                                Custom
                              </Label>
                              <FormField
                                control={importForm.control}
                                name="customTermSeparator"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="h-8 w-32"
                                        placeholder=":"
                                        disabled={termSeparator !== "custom"}
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Between cards */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Between cards</Label>
                <FormField
                  control={importForm.control}
                  name="cardSeparator"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="newline" id="newline" />
                              <Label htmlFor="newline" className="font-normal">
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
                              <RadioGroupItem value="custom" id="card-custom" />
                              <Label
                                htmlFor="card-custom"
                                className="font-normal"
                              >
                                Custom
                              </Label>
                              <FormField
                                control={importForm.control}
                                name="customCardSeparator"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="h-8 w-32"
                                        placeholder="\n\n"
                                        disabled={cardSeparator !== "custom"}
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

            <div className="flex gap-4">
              <DialogClose asChild>
                <Button ref={dialogCloseRef} type="button" variant="secondary">
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
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
