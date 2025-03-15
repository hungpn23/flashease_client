import { LoadSetDetail } from "@/app/(core)/_actions/load-set-detail";
import { Flashcard } from "@/app/(core)/_components/flashcard";
import { ProgressBar } from "@/app/(core)/_components/progress-bar";
import { Container } from "@/components/layouts/container";
import { Params } from "@/types/page-params.type";

export default async function FlashcardPage({ params }: { params: Params }) {
  const { setId } = await params;
  const setDetail = await LoadSetDetail(setId);
  if ("statusCode" in setDetail) throw new Error("Failed to load set detail");

  const { set, metadata } = setDetail;

  return (
    <Container>
      <ProgressBar metadata={metadata} />

      <Flashcard set={set} />

      {/* Keyboard shortcuts */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>
          Press{" "}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            Space
          </kbd>{" "}
          to flip card
        </p>

        <p>
          Press{" "}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            ←
          </kbd>{" "}
          for incorrect,{" "}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            →
          </kbd>{" "}
          for correct
        </p>
      </div>
    </Container>
  );
}
