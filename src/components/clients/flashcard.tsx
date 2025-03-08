"use client";

import { Set, SetMetadata } from "@/types/set";
import { X, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface FlashcardProps {
  set: Set;
  metadata: SetMetadata;
}

export function Flashcard({ set, metadata }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between gap-8 text-primary-foreground">
        <span className="text-heading">
          Not studied ({metadata.notStudiedCount})
        </span>
        <span className="text-link">Learning ({metadata.learningCount})</span>
        <span className="text-highlight">Known ({metadata.knownCount})</span>
      </div>

      <Card
        className="mb-2 flex min-h-[500px] cursor-pointer dark:bg-secondary"
        onClick={handleFlip}
        tabIndex={0}
      >
        <CardContent className="flex flex-1 items-center justify-center text-3xl font-medium">
          {isFlipped ? set.cards?.[0].definition : set.cards?.[0].term}
        </CardContent>
      </Card>

      <div className="mx-auto flex gap-8">
        <Button variant="outline">
          <X className="text-destructive" />
        </Button>

        <Button variant="outline">
          <Check className="text-highlight" />
        </Button>
      </div>
    </div>
  );
}
