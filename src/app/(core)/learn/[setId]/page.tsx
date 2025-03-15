import { LoadSetDetail } from "@/app/(core)/_actions/load-set-detail";
import { Container } from "@/components/layouts/container";
import { ProgressBar } from "@/app/(core)/_components/progress-bar";
import { Params } from "@/types/page-params.type";
import { Learn } from "@/app/(core)/_components/learn";

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

      <Learn set={set} />

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>
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

        <p className="mt-3">
          Press{" "}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            X
          </kbd>{" "}
          to skip a question,{" "}
          <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
            S
          </kbd>{" "}
          to play pronunciation.{" "}
        </p>
      </div>
    </Container>
  );
}
