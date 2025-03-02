import { Card } from "@/types/data/card.type";

export function getCardsStatus(cards: Card[] = []) {
  const known =
    cards.filter((c) => c.correctCount && c.correctCount >= 2) || [];
  const learning =
    cards.filter(
      (c) => c.correctCount && c.correctCount >= 0 && c.correctCount <= 1,
    ) || [];
  const notStudied = cards.filter((c) => !c.correctCount) || [];

  return {
    known,
    learning,
    notStudied,
  };
}
