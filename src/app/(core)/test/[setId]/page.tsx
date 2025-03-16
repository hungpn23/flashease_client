import { Container } from "@/components/layouts/container";
import { Params } from "@/types/page-params.type";
import { LoadSet } from "@/app/(home)/_actions/load-set";
import { Test } from "@/app/(core)/_components/test";

export default async function TestPage({ params }: { params: Params }) {
  const { setId } = await params;
  const set = await LoadSet(setId, "library");
  if ("statusCode" in set) throw new Error("Failed to load set detail");

  return (
    <Container>
      <div className="mb-2 text-center text-sm text-muted-foreground">
        Press{" "}
        <kbd className="rounded border-b-2 border-primary bg-muted px-2 py-1 text-foreground">
          Tab
        </kbd>{" "}
        to quickly move to next question.
      </div>

      <Test set={set} />
    </Container>
  );
}
