"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { Set } from "@/types/data/set.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card as CardUI, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useFlashcard } from "@/app/(core)/_hooks/use-flashcard";
import { useSoundEffect } from "../_context/sound.context";

export function Learn({ set }: { set: Set }) {
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
    get3RandomWrongAnswers,
  } = useFlashcard({
    set,
    isSoundEnabled,
    successSound,
    finishSound,
    playWordPronunciation,
  });

  // State và Ref
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const isKeyProcessed = useRef(false);
  const isSoundKeyProcessed = useRef(false);

  // Callback handlers
  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (selectedAnswer) return;
      const correct = answer === currentCard.definition;
      setSelectedAnswer(answer);
      setIsCorrect(correct);
    },
    [selectedAnswer, currentCard],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat) {
        e.preventDefault();
        return;
      }

      // Xử lý phím phát âm thanh
      if (e.code === "KeyS" && !isSoundKeyProcessed.current) {
        e.preventDefault();
        isSoundKeyProcessed.current = true;
        handlePlayWordPronunciation(currentCard);
        setTimeout(() => {
          isSoundKeyProcessed.current = false;
        }, 1000);
        return;
      }

      // Xử lý phím chọn đáp án khi chưa chọn
      if (selectedAnswer) return;

      if (
        ["Digit1", "Digit2", "Digit3", "Digit4", "KeyX"].includes(e.code) &&
        !isKeyProcessed.current
      ) {
        e.preventDefault();
        isKeyProcessed.current = true;

        const keyMap: { [key: string]: number | string } = {
          Digit1: 0,
          Digit2: 1,
          Digit3: 2,
          Digit4: 3,
          KeyX: "___skip___",
        };

        const answerIndex = keyMap[e.code];
        if (typeof answerIndex === "number" && answers[answerIndex]) {
          handleSelectAnswer(answers[answerIndex]);
        } else if (answerIndex === "___skip___") {
          handleSelectAnswer("___skip___");
        }

        setTimeout(() => {
          isKeyProcessed.current = false;
        }, 333);
      }
    },
    [
      selectedAnswer,
      answers,
      currentCard,
      handlePlayWordPronunciation,
      handleSelectAnswer,
    ],
  );

  // Effects
  useEffect(() => {
    if (currentCard) {
      const correctAnswer = currentCard.definition;
      const wrongAnswers = get3RandomWrongAnswers(currentCard);
      const shuffledAnswers = [correctAnswer, ...wrongAnswers].sort(
        () => 0.5 - Math.random(),
      );
      setAnswers(shuffledAnswers);
    }
  }, [currentCard, get3RandomWrongAnswers]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && selectedAnswer) {
        e.preventDefault();
        saveAnswer(isCorrect!, currentCardIndex, set);
        setSelectedAnswer(null);
        setIsCorrect(null);
      }
    };

    if (selectedAnswer) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [selectedAnswer, isCorrect, saveAnswer, currentCardIndex, set]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // JSX
  return (
    <div className="mt-2 flex flex-col">
      <CardUI className="relative mb-4 flex min-h-[500px] flex-col dark:bg-secondary">
        <CardHeader>
          <span className="flex items-center gap-2">
            Term
            <Button
              className="rounded-full"
              variant="ghost"
              size="icon"
              onClick={() => handlePlayWordPronunciation(currentCard)}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </span>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center text-3xl font-medium">
          {currentCard.term}
          <Button
            variant="link"
            className="absolute right-4 top-4 w-fit text-foreground hover:underline"
            onClick={() => handleSelectAnswer("___skip___")}
          >
            Don&apos;t know?
          </Button>
        </CardContent>

        <div className="flex flex-col gap-2 px-4 py-2">
          {selectedAnswer && (
            <p className="mx-auto mb-2 text-muted-foreground">
              Click the correct answer or press{" "}
              <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
                Space
              </kbd>{" "}
              to continue.
            </p>
          )}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            {answers.map((answer, index) => {
              const isSelected = selectedAnswer === answer;
              const isCorrectAnswer = answer === currentCard.definition;
              let borderClass = "";
              if (isSelected) {
                borderClass = isCorrect
                  ? "border-2 border-green-500"
                  : "border-2 border-red-500";
              } else if (selectedAnswer && isCorrectAnswer) {
                borderClass = "border-2 border-green-500 border-dashed";
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full text-left ${borderClass}`}
                  onClick={() => {
                    if (selectedAnswer && isCorrectAnswer) {
                      saveAnswer(isCorrect!, currentCardIndex, set);
                      setSelectedAnswer(null);
                      setIsCorrect(null);
                    } else {
                      handleSelectAnswer(answer);
                    }
                  }}
                  disabled={selectedAnswer !== null && !isCorrectAnswer}
                >
                  <span className="flex w-full overflow-auto">
                    <span className="mr-2">{index + 1}.</span>
                    <span>{answer}</span>
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="mx-4 mb-4 flex justify-between">
          <Badge variant="outline" className="px-2 py-1 hover:cursor-auto">
            {currentCardIndex + 1}/{orderedCards.length}
          </Badge>
          <Badge className="px-2 py-1 hover:cursor-auto">{cardStatus}</Badge>
        </div>
      </CardUI>

      <div className="mx-auto flex items-center gap-2">
        <Switch checked={isSoundEnabled} onCheckedChange={handleSoundToggle} />
        <span>Sound effect</span>
      </div>
    </div>
  );
}
