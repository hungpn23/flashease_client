"use client";

import { Button } from "@/components/ui/button";
import { Set } from "@/types/data/set";
import { NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LearnBtn({ set, known }: { set: Set; known: number }) {
  const router = useRouter();

  const handleClick = () => {
    known === set.cards.length
      ? toast.error("Please reset to continue studying.")
      : router.push(`/learn/${set.id}`);
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Learn <NotebookPen className="ml-1 inline h-4 w-4" />
    </Button>
  );
}
