"use client";

import { Button } from "@/components/ui/button";
import { Set } from "@/types/data/set.type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type LearningType = "learn" | "flashcard" | "test";

export function LearningBtn({
  type,
  set,
  known,
  children,
}: {
  type: LearningType;
  set: Set;
  known: number;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleClick = () => {
    known === set.cards.length
      ? toast.error("Please reset to continue studying.")
      : router.push(`/${type}/${set.id}`);
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      {children}
    </Button>
  );
}
