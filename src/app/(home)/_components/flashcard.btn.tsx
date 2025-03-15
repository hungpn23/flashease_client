"use client";

import { Button } from "@/components/ui/button";
import { Set } from "@/types/data/set";
import { StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function FlashcardBtn({ set, known }: { set: Set; known: number }) {
  const router = useRouter();

  const handleClick = () => {
    known === set.cards.length
      ? toast.error("Please reset flashcard to continue studying.")
      : router.push(`/flashcard/${set.id}`);
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Flashcard <StickyNote className="ml-1 inline h-4 w-4" />
    </Button>
  );
}
