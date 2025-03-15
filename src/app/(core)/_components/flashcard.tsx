"use client";

import { Set } from "@/types/data/set";
import { X, Check, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card as CardUI, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useSoundEffect } from "../_context/sound.context";
import { useFlashcard } from "@/app/(core)/_hooks/use-flashcard";

export function Flashcard({ set }: { set: Set }) {
  const {
    successSound,
    finishSound,
    isSoundEnabled,
    handleSoundToggle,
    playWordPronunciation,
  } = useSoundEffect();

  const {
    currentCardIndex,
    orderedCards,
    currentCard,
    cardStatus,
    saveAnswer,
    handlePlayWordPronunciation,
  } = useFlashcard({
    set,
    isSoundEnabled,
    successSound,
    finishSound,
    playWordPronunciation,
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const isKeyProcessed = useRef(false);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const COOLDOWN_TIME = 333;
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
      } else if (e.code === "KeyS") {
        e.preventDefault();
        handlePlayWordPronunciation(currentCard);
      }

      setTimeout(() => {
        isKeyProcessed.current = false;
      }, COOLDOWN_TIME);
    },
    [
      handleFlip,
      saveAnswer,
      handlePlayWordPronunciation,
      currentCardIndex,
      set,
      currentCard,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="mt-2 flex flex-col">
      <CardUI
        className="mb-4 flex min-h-[500px] cursor-pointer flex-col dark:bg-secondary"
        onClick={handleFlip}
        tabIndex={0}
      >
        <CardHeader>
          <span className="flex items-center gap-2">
            {isFlipped ? "Definition" : "Term"}{" "}
            <Button
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handlePlayWordPronunciation(currentCard);
              }}
              variant="ghost"
              size="icon"
            >
              <Volume2 className="inline h-4 w-4" />
            </Button>
          </span>
        </CardHeader>
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
