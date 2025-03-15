"use client";

import { ResetFlashcard } from "@/app/(home)/_actions/reset-flashcard";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function ResetFlashcardBtn({ setId }: { setId: string }) {
  return (
    <Button
      onClick={() =>
        ResetFlashcard(setId)
          .then(() => {
            toast.dismiss();
            toast.success("Flashcard has been reset!");
          })
          .catch((err) => toast.error(err.message))
      }
    >
      Reset flashcard
    </Button>
  );
}
