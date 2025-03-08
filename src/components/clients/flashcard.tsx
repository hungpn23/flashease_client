"use client";

import { Set, SetMetadata } from "@/types/set";
import { X, Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card as CardUI, CardContent } from "../ui/card";
import { SaveAnswer } from "@/actions/set/save-answer";
import { Badge } from "@/components/ui/badge";

interface FlashcardProps {
  set: Set;
  metadata: SetMetadata;
}

export function Flashcard({ set, metadata }: FlashcardProps) {
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

      if (error) return alert("Có lỗi xảy ra khi lưu câu trả lời!");

      if (currentCardIndex < set.cards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        setIsFlipped(false);
      } else {
        alert("Bạn đã hoàn thành tất cả các card!");
      }
    },
    [],
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
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between gap-8 text-primary-foreground">
        <span className="text-heading">
          Not studied ({metadata.notStudiedCount})
        </span>
        <span className="text-link">Learning ({metadata.learningCount})</span>
        <span className="text-highlight">Known ({metadata.knownCount})</span>
      </div>

      <CardUI
        className="relative mb-4 flex min-h-[500px] cursor-pointer dark:bg-secondary"
        onClick={handleFlip}
        tabIndex={0}
      >
        <CardContent className="flex flex-1 items-center justify-center text-3xl font-medium">
          {isFlipped
            ? set.cards[currentCardIndex].definition
            : `${currentCardIndex + 1}/${set.cards.length}: ${set.cards[currentCardIndex].term} (${set.cards[currentCardIndex].correctCount})`}
        </CardContent>

        <Badge
          // variant="outline"
          className="absolute bottom-4 right-4 px-2 py-1 hover:cursor-auto"
        >
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
