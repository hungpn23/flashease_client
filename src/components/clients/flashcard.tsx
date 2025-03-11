"use client";

import { Set } from "@/types/set";
import { X, Check } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card as CardUI, CardContent, CardHeader } from "../ui/card";
import { SaveAnswer } from "@/actions/set/save-answer";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Card } from "@/types/data/card.type";

interface FlashcardProps {
  set: Set;
}

export function Flashcard({ set }: FlashcardProps) {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sortedCardIds, setSortedCardIds] = useState<string[]>([]);
  const [orderedCards, setOrderedCards] = useState(set.cards);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  useEffect(() => {
    // Khi component mount, tính toán và lưu thứ tự ban đầu
    if (sortedCardIds.length === 0 && set.cards.length > 0) {
      const sorted = [...set.cards].sort((cardA, cardB) => {
        const getOrder = (card: (typeof set.cards)[number]) => {
          if (card.correctCount === null) return 0;
          if (card.correctCount < 2) return 1;
          return 2;
        };
        return getOrder(cardA) - getOrder(cardB);
      });
      setSortedCardIds(sorted.map((card) => card.id));
      setOrderedCards(sorted);
    }

    // Mỗi khi set.cards cập nhật (do revalidate), cập nhật lại thông tin chi tiết của card theo thứ tự ban đầu
    if (sortedCardIds.length > 0) {
      const newCardsMap = new Map(set.cards.map((card) => [card.id, card]));
      const newOrderedCards = sortedCardIds
        .map((id) => newCardsMap.get(id))
        .filter((card) => card !== undefined) as Card[];
      setOrderedCards(newOrderedCards);
    }
  }, [set, sortedCardIds]);

  const saveAnswer = useCallback(
    async (isCorrect: boolean, currentCardIndex: number, set: Set) => {
      const cardId = orderedCards[currentCardIndex].id;
      const setId = set.id;

      const error = await SaveAnswer(setId, cardId, isCorrect);

      if (error)
        return toast.error("An error occurred while saving the answer!");

      if (currentCardIndex < orderedCards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        setIsFlipped(false);
      } else {
        toast.success("You have completed all the cards!");
        return router.push("/library");
      }

      isCorrect ? toast.success("Good job!") : toast.error("Keep going!");
    },
    [orderedCards, router],
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

  // Xác định trạng thái của card hiện tại dựa trên orderedCards
  const currentCard = orderedCards[currentCardIndex];
  let cardStatus = "Not studied";
  if (currentCard.correctCount !== null) {
    if (currentCard.correctCount >= 2) {
      cardStatus = "Known";
    } else {
      cardStatus = "Learning";
    }
  }

  return (
    <div className="mt-2 flex flex-col">
      <CardUI
        className="mb-4 flex min-h-[500px] cursor-pointer flex-col dark:bg-secondary"
        onClick={handleFlip}
        tabIndex={0}
      >
        <CardHeader>{isFlipped ? "Definition" : "Term"}</CardHeader>
        <CardContent className="flex flex-1 items-center justify-center text-3xl font-medium">
          {isFlipped ? currentCard.definition : currentCard.term}
        </CardContent>

        <div className="mx-4 mb-4 flex justify-between">
          <Badge variant="outline" className="px-2 py-1 hover:cursor-auto">
            {currentCardIndex + 1}/{orderedCards.length}
          </Badge>

          <Badge className="px-2 py-1 hover:cursor-auto">{cardStatus}</Badge>
        </div>
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
