"use client";

import { Set } from "@/types/data/set";
import { Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card as CardUI, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useSoundEffect } from "../_context/sound.context";
import { useFlashcard } from "@/app/(core)/_hooks/use-flashcard";

export function Learn({ set }: { set: Set }) {
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

  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (selectedAnswer) return;

      const correct = answer === currentCard.definition;
      setSelectedAnswer(answer);
      setIsCorrect(correct);
    },
    [selectedAnswer, currentCard],
  );

  // Load danh sách đáp án khi currentCard thay đổi
  useEffect(() => {
    if (currentCard) {
      const correctAnswer = currentCard.definition;
      const wrongAnswers = get3RandomWrongAnswers(currentCard);
      const allAnswers = [correctAnswer, ...wrongAnswers];
      const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
      setAnswers(shuffledAnswers);
    }
  }, [currentCard, get3RandomWrongAnswers]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && selectedAnswer) {
        saveAnswer(isCorrect!, currentCardIndex, set);
        setSelectedAnswer(null);
        setIsCorrect(null);
      }
    };

    if (selectedAnswer) window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    selectedAnswer,
    isCorrect,
    saveAnswer,
    currentCardIndex,
    set,
    currentCard,
  ]);

  const isKeyProcessed = useRef(false);
  const isSoundKeyProcessed = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat || selectedAnswer) {
        e.preventDefault();
        return;
      }

      if (e.code === "KeyS" && !isSoundKeyProcessed.current) {
        isSoundKeyProcessed.current = true;
        handlePlayWordPronunciation(currentCard);
        setTimeout(() => {
          isSoundKeyProcessed.current = false;
        }, 1000);
      }

      if (
        (e.code === "Digit1" ||
          e.code === "Digit2" ||
          e.code === "Digit3" ||
          e.code === "Digit4" ||
          e.code === "KeyX") &&
        !isKeyProcessed.current
      ) {
        isKeyProcessed.current = true;

        if (e.code === "Digit1" && answers[0]) {
          handleSelectAnswer(answers[0]);
        } else if (e.code === "Digit2" && answers[1]) {
          handleSelectAnswer(answers[1]);
        } else if (e.code === "Digit3" && answers[2]) {
          handleSelectAnswer(answers[2]);
        } else if (e.code === "Digit4" && answers[3]) {
          handleSelectAnswer(answers[3]);
        } else if (e.code === "KeyX") {
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="mt-2 flex flex-col">
      <CardUI className="relative mb-4 flex min-h-[500px] flex-col dark:bg-secondary">
        <CardHeader>
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
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center text-3xl font-medium">
          {currentCard.term}
          <Button
            variant="link"
            className="absolute right-4 top-4 w-fit text-foreground hover:underline"
          >
            Don&apos;t know?
          </Button>
        </CardContent>

        {/* Hiển thị danh sách đáp án */}
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
                borderClass = isCorrect ? "border-green-500" : "border-red-500";
              } else if (selectedAnswer && isCorrectAnswer) {
                borderClass = "border-green-500 border-dashed";
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full text-left ${borderClass}`}
                  onClick={() => {
                    if (selectedAnswer && isCorrectAnswer) {
                      if (isCorrect !== null) {
                        saveAnswer(isCorrect, currentCardIndex, set);
                      }

                      setSelectedAnswer(null);
                      setIsCorrect(null);
                    } else if (!selectedAnswer) {
                      handleSelectAnswer(answer);
                    }
                  }}
                  disabled={selectedAnswer !== null && !isCorrectAnswer}
                >
                  <span className="flex w-full overflow-auto">
                    <span className="mr-auto">{index + 1}.</span>
                    <span className="mr-auto">{`${answer}`}</span>
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
