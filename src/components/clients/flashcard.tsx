"use client";

import { Set } from "@/types/set";
import { X, Check } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card as CardUI, CardContent, CardHeader } from "../ui/card";
import { SaveAnswer } from "@/actions/set/save-answer";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Card } from "@/types/data/card.type";
import { Switch } from "../ui/switch";
// import sound from "@/../public/sound/success.mp3";

interface FlashcardProps {
  set: Set;
}

export function Flashcard({ set }: FlashcardProps) {
  // **************
  // * SOUND EFFECT
  // **************
  const [successSound, setSuccessSound] = useState<HTMLAudioElement | null>(
    null,
  );
  const [finishSound, setFinishSound] = useState<HTMLAudioElement | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true); // State cho âm thanh

  useEffect(() => {
    setSuccessSound(new Audio("/sound/success.mp3"));
    setFinishSound(new Audio("/sound/finish.mp3"));
  }, []);

  useEffect(() => {
    const soundEffect = localStorage.getItem("sound_effect");
    if (soundEffect !== null) {
      setIsSoundEnabled(soundEffect === "true");
    } else {
      setIsSoundEnabled(true);
      localStorage.setItem("sound_effect", "true");
    }
  }, []);

  const handleSoundToggle = (checked: boolean) => {
    setIsSoundEnabled(checked);
    localStorage.setItem("sound_effect", checked.toString());
  };

  // *****************
  // * FLASHCARD LOGIC
  // *****************
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sortedCardIds, setSortedCardIds] = useState<string[]>([]);
  const [orderedCards, setOrderedCards] = useState(set.cards);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  useEffect(() => {
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

    if (sortedCardIds.length > 0) {
      const newCardsMap = new Map(set.cards.map((card) => [card.id, card]));
      const newOrderedCards = sortedCardIds
        .map((id) => newCardsMap.get(id))
        .filter((card) => card !== undefined) as Card[];
      setOrderedCards(newOrderedCards);
    }
  }, [set, sortedCardIds]);

  useEffect(() => {
    const finished = orderedCards.every(
      (card) => card.correctCount && card.correctCount >= 2,
    );

    if (finished) {
      if (finishSound && isSoundEnabled) {
        finishSound
          .play()
          .catch((err) => toast.error("Error playing finish sound:", err));
      }

      toast.dismiss();
      toast.success("You have completed all the cards!", { duration: 3000 });
      router.push(`/library/${set.id}`);
    }
  }, [set, isSoundEnabled, orderedCards, router, finishSound]);

  const saveAnswer = useCallback(
    async (isCorrect: boolean, currentCardIndex: number, set: Set) => {
      const cardId = orderedCards[currentCardIndex].id;
      const setId = set.id;
      await SaveAnswer(setId, cardId, isCorrect).catch((err) => {
        toast.error("An error occurred while saving the answer!");
      });

      // If not all cards are known, proceed
      if (currentCardIndex < orderedCards.length - 1) {
        // Move to the next card
        setCurrentCardIndex((prev) => prev + 1);
        setIsFlipped(false);
      } else {
        // Reached the end, filter remaining cards (not studied or learning)
        const remainingCards = orderedCards.filter(
          (card) => card.correctCount === null || card.correctCount < 2,
        );
        setOrderedCards(remainingCards);
        setCurrentCardIndex(0);
        setIsFlipped(false);
      }

      if (isCorrect) {
        if (successSound && isSoundEnabled) {
          successSound
            .play()
            .catch((err) => toast.error("Error playing success sound:", err));
        }

        toast.dismiss();
        toast.success("Good job!");
      } else {
        toast.dismiss();
        toast.error("Keep going!");
      }
    },
    [orderedCards, isSoundEnabled, successSound],
  );

  const isKeyProcessed = useRef(false);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat) {
        e.preventDefault();
        return;
      }

      if (isKeyProcessed.current) return;
      isKeyProcessed.current = true;

      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowLeft") {
        saveAnswer(false, currentCardIndex, set);
      } else if (e.code === "ArrowRight") {
        saveAnswer(true, currentCardIndex, set);
      }

      setTimeout(() => {
        isKeyProcessed.current = false;
      }, 200);
    },
    [handleFlip, saveAnswer, currentCardIndex, set],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const currentCard = orderedCards[currentCardIndex];
  let cardStatus = "Not studied";
  if (currentCard.correctCount) {
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

      <div className="mx-auto mt-4 flex items-center gap-2">
        <Switch checked={isSoundEnabled} onCheckedChange={handleSoundToggle} />
        <span>Sound effect</span>
      </div>
    </div>
  );
}
