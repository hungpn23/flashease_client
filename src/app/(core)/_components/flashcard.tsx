"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Volume2, X } from "lucide-react";
import { Set } from "@/types/data/set.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card as CardUI, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useFlashcard } from "@/app/(core)/_hooks/use-flashcard";
import { useSoundEffect } from "../_context/sound.context";

export function Flashcard({ set }: { set: Set }) {
  // Hooks từ context và custom hook
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

  // State và Ref
  const [isFlipped, setIsFlipped] = useState(false);
  const isKeyProcessed = useRef(false);

  // Callback handlers
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const COOLDOWN_TIME = 333;

      if (e.repeat || isKeyProcessed.current) {
        e.preventDefault();
        return;
      }

      isKeyProcessed.current = true;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handleFlip();
          break;
        case "ArrowLeft":
          saveAnswer(false, currentCardIndex, set);
          break;
        case "ArrowRight":
          saveAnswer(true, currentCardIndex, set);
          break;
        case "KeyS":
          e.preventDefault();
          handlePlayWordPronunciation(currentCard);
          break;
        default:
          break;
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

  // Effect để xử lý sự kiện phím
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // JSX
  return (
    <div className="mt-2 flex flex-col">
      <CardUI
        className="mb-4 flex min-h-[500px] cursor-pointer flex-col dark:bg-secondary"
        onClick={handleFlip}
        tabIndex={0}
      >
        <CardHeader>
          <span className="flex items-center gap-2">
            {isFlipped ? "Definition" : "Term"}
            <Button
              className="rounded-full"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePlayWordPronunciation(currentCard);
              }}
            >
              <Volume2 className="h-4 w-4" />
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
          <X className="ml-2 text-destructive" />
        </Button>
        <Button
          variant="outline"
          onClick={() => saveAnswer(true, currentCardIndex, set)}
        >
          Already know
          <Check className="ml-2 text-highlight" />
        </Button>
      </div>

      <div className="mx-auto mt-4 flex items-center gap-2">
        <Switch checked={isSoundEnabled} onCheckedChange={handleSoundToggle} />
        <span>Sound effect</span>
      </div>
    </div>
  );
}
