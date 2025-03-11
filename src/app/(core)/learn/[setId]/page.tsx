import { LoadSetDetail } from "@/actions/set/load-set-detail";
import { Flashcard } from "@/components/clients/flashcard";
import { Container } from "@/components/layouts/container";
import { ProgressBar } from "@/components/servers/progress-bar";
import { Params } from "@/types/page-params.type";

interface LearnPageProps {
  params: Params;
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { setId } = await params;
  const setDetail = await LoadSetDetail(setId);
  if ("statusCode" in setDetail) throw new Error("Failed to load set detail");

  const { set, metadata } = setDetail;

  return (
    <Container>
      <ProgressBar metadata={metadata} />

      <Flashcard set={set} />

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p className="mb-2">
          Press{" "}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            1
          </kbd>
          {","}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            2
          </kbd>
          {","}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            3
          </kbd>
          {","}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            4
          </kbd>{" "}
          to quickly select an answer.
        </p>

        <p>
          Press{" "}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            X
          </kbd>{" "}
          to skip a question.{" "}
        </p>
      </div>
    </Container>
  );
}
