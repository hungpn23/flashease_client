import { LoadSetDetail } from "@/actions/set/load-set-detail";
import { Flashcard } from "@/components/clients/flashcard";
import { Container } from "@/components/layouts/container";
import { Params } from "@/types/page-params.type";

interface FlashcardPageProps {
  params: Params;
}

export default async function FlashcardPage({ params }: FlashcardPageProps) {
  const { setId } = await params;
  const setDetail = await LoadSetDetail(setId);
  if ("statusCode" in setDetail) throw new Error("Failed to load set detail");

  const { set, metadata } = setDetail;

  return (
    <Container>
      <Flashcard set={set} metadata={metadata} />
    </Container>
  );
}
