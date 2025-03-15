"use client";

import { Set } from "@/types/data/set";
import { X, Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SaveAnswer } from "@/app/(core)/_actions/save-answer";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card as CardUI, CardContent } from "@/components/ui/card";

export function Learn({ set }: { set: Set }) {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const saveAnswer = useCallback(
    async (isCorrect: boolean, currentCardIndex: number, set: Set) => {
      const cardId = set.cards[currentCardIndex].id;
      const setId = set.id;

      const error = await SaveAnswer(setId, cardId, isCorrect);

      if (error)
        return toast.error("An error occurred while saving the answer!");

      if (currentCardIndex < set.cards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        setIsFlipped(false);
      } else {
        toast.success("You have completed all the cards!");
        return router.push("/library");
      }

      isCorrect ? toast.success("Good job!") : toast.error("Keep going!");
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowLeft") {
        saveAnswer(false, currentCardIndex, set);
      } else if (e.code === "ArrowRight") {
        saveAnswer(true, currentCardIndex, set);
      }
    },
    [handleFlip, saveAnswer, currentCardIndex, set],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  let cardStatus = "Not studied";
  if (set.cards[currentCardIndex].correctCount !== null) {
    if (set.cards[currentCardIndex].correctCount >= 2) {
      cardStatus = "Known";
    } else {
      cardStatus = "Learning";
    }
  }

  return (
    <div className="mt-2 flex flex-col">
      <CardUI
        className="relative mb-4 flex min-h-[500px] cursor-pointer dark:bg-secondary"
        onClick={handleFlip}
        tabIndex={0}
      >
        <CardContent className="flex flex-1 items-center justify-center text-3xl font-medium">
          {isFlipped
            ? set.cards[currentCardIndex].definition
            : set.cards[currentCardIndex].term}
        </CardContent>

        <Badge
          variant="outline"
          className="absolute bottom-4 left-4 px-2 py-1 hover:cursor-auto"
        >
          {currentCardIndex + 1}/{set.cards.length}
        </Badge>

        <Badge className="absolute bottom-4 right-4 px-2 py-1 hover:cursor-auto">
          {cardStatus}
        </Badge>
      </CardUI>

      <div className="mx-auto flex gap-8">
        <Button
          variant="outline"
          onClick={() => saveAnswer(false, currentCardIndex, set)}
        >
          Unfamiliar
          <X className="inline text-destructive" />
        </Button>

        <Button
          variant="outline"
          onClick={() => saveAnswer(true, currentCardIndex, set)}
        >
          Already know
          <Check className="inline text-highlight" />
        </Button>
      </div>
    </div>
  );
}
