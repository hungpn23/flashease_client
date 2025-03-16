"use client";

import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Set } from "@/types/data/set.type";
import { Card } from "@/types/data/card.type";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card as CardUI, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export function Test({ set }: { set: Set }) {
  // Schema và Type cho form
  const testSchema = z.object({
    questions: z
      .number()
      .int({ message: "Number of questions must be an integer." })
      .positive({ message: "Number of questions must be greater than 0." })
      .min(4, { message: "Number of questions must be at least 4." })
      .max(set.cards.length, {
        message: `Maximum number of questions is ${set.cards.length}.`,
      }),
    questionType: z.enum(["term", "definition"], {
      message: "Please select a question type.",
    }),
  });

  type TestInput = z.infer<typeof testSchema>;

  // State và Ref
  const [configDialogOpen, setConfigDialogOpen] = useState(true);
  const [questions, setQuestions] = useState<Card[]>([]);
  const [questionType, setQuestionType] = useState<"term" | "definition">(
    "definition",
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [correctIndices, setCorrectIndices] = useState<number[]>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Form setup
  const form = useForm<TestInput>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      questions: set.cards.length,
      questionType: "definition",
    },
  });

  // Handlers
  const handleConfigSubmit = useCallback(
    (values: TestInput) => {
      const selectedCards = set.cards
        .sort(() => 0.5 - Math.random())
        .slice(0, values.questions) as Card[];
      setQuestions(selectedCards);
      setAnswers(new Array(selectedCards.length).fill(""));
      setQuestionType(values.questionType);
      setConfigDialogOpen(false);
      cardRefs.current = new Array(selectedCards.length).fill(null);
    },
    [set.cards],
  );

  const handleCheckAnswers = useCallback(() => {
    const hasEmptyAnswer = answers.some((answer) => answer.trim() === "");
    if (hasEmptyAnswer) {
      toast.error("Please fill in all answers before checking!");
      return;
    }

    let count = 0;
    const newCorrectIndices: number[] = [];

    questions.forEach((card, index) => {
      const userAnswer = answers[index].trim().toLowerCase();
      const correctAnswer =
        questionType === "definition"
          ? card.term.trim().toLowerCase()
          : card.definition.trim().toLowerCase();

      if (userAnswer === correctAnswer) {
        count++;
        newCorrectIndices.push(index);
      }
    });

    setCorrectCount(count);
    setCorrectIndices(newCorrectIndices);
    toast.success(
      `You answered ${count}/${questions.length} questions correctly!`,
    );
  }, [answers, questions, questionType]);

  // JSX
  return (
    <div>
      <AlertDialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Test configuration</AlertDialogTitle>
            <AlertDialogDescription>
              Please select the number of questions and question type.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleConfigSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="questions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of questions</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="term" id="term" />
                          <Label htmlFor="term">Term</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="definition" id="definition" />
                          <Label htmlFor="definition">Definition</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <Button autoFocus type="submit">
                  Start
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      {questions.length > 0 && (
        <div className="flex flex-col">
          <h1 className="mx-auto mb-4 text-2xl font-bold">{set.name}</h1>
          <div className="space-y-4">
            {questions.map((card, index) => (
              <CardUI
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="dark:bg-secondary"
              >
                <CardHeader>
                  <div className="flex justify-between">
                    <span>
                      {questionType === "definition" ? "Definition" : "Term"}
                    </span>
                    <Badge
                      variant="outline"
                      className="px-2 py-1 hover:cursor-auto"
                    >
                      {index + 1}/{questions.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xl">
                    {questionType === "definition"
                      ? card.definition
                      : card.term}
                  </p>
                </CardContent>
                <CardContent>
                  <Input
                    className={cn(
                      "rounded-lg focus:border-0 focus:border-b-2 focus:border-primary focus:dark:border-primary-foreground",
                      { "border-highlight": correctIndices.includes(index) },
                    )}
                    placeholder={`Enter ${questionType === "definition" ? "term" : "definition"}`}
                    value={answers[index] || ""}
                    autoFocus={index === 0}
                    tabIndex={index + 1}
                    onFocus={() => {
                      cardRefs.current[index]?.scrollIntoView({
                        behavior: "instant",
                        block: "center",
                      });
                    }}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                  />
                </CardContent>
              </CardUI>
            ))}
            <Button
              className="mx-auto flex w-fit"
              tabIndex={questions.length}
              onClick={handleCheckAnswers}
            >
              Check answers
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
