"use client";

import { ResetFlashcard } from "@/actions/set/reset-flashcard";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

export function ResetFlashcardBtn({ setId }: { setId: string }) {
  return (
    <Button
      onClick={() =>
        ResetFlashcard(setId)
          .then(() => toast.success("Flashcard has been reset!"))
          .catch((err) => toast.error(err.message))
      }
    >
      Reset flashcard
    </Button>
  );
}
