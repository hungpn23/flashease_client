"use client";

import { Set } from "@/types/data/set.type";
import { Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card as CardUI, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useSoundEffect } from "../_context/sound.context";
import { useFlashcard } from "@/app/(core)/_hooks/use-flashcard";

export function Test({ set }: { set: Set }) {
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
    get3RandomWrongAnswers,
  } = useFlashcard({
    set,
    isSoundEnabled,
    successSound,
    finishSound,
    playWordPronunciation,
  });

  const isSoundKeyProcessed = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat) return e.preventDefault();

      if (e.code === "KeyS" && !isSoundKeyProcessed.current) {
        isSoundKeyProcessed.current = true;
        handlePlayWordPronunciation(currentCard);
        setTimeout(() => {
          isSoundKeyProcessed.current = false;
        }, 1000);
      }
    },
    [currentCard, handlePlayWordPronunciation],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col">
      <div className="mx-auto mb-2 flex items-center gap-2">
        <Switch checked={isSoundEnabled} onCheckedChange={handleSoundToggle} />
        <span>Sound effect</span>
      </div>

      <CardUI className="mb-4 flex min-h-[500px] flex-col dark:bg-secondary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              Term
              <Button
                className="rounded-full"
                onClick={() => handlePlayWordPronunciation(currentCard)}
                variant="ghost"
                size="icon"
              >
                <Volume2 className="inline h-4 w-4" />
              </Button>
            </span>

            <Badge variant="outline" className="px-2 py-1 hover:cursor-auto">
              {currentCardIndex + 1}/{orderedCards.length}
            </Badge>

            <Button
              variant="link"
              className="w-fit text-foreground hover:underline"
            >
              Don&apos;t know?
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 text-2xl font-medium">
          {currentCard.term}
        </CardContent>
      </CardUI>
    </div>
  );
}
