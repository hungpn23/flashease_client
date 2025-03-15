import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Set } from "@/types/data/set";
import { Card } from "@/types/data/card.type";
import { SaveAnswer } from "@/app/(core)/_actions/save-answer";

interface UseFlashcardProps {
  set: Set;
  isSoundEnabled: boolean;
  successSound: HTMLAudioElement | null;
  finishSound: HTMLAudioElement | null;
  playWordPronunciation: (text: string) => void;
}

interface UseFlashcardReturn {
  currentCardIndex: number;
  setCurrentCardIndex: React.Dispatch<React.SetStateAction<number>>;
  sortedCardIds: string[];
  orderedCards: Card[];
  currentCard: Card;
  cardStatus: string;
  saveAnswer: (
    isCorrect: boolean,
    currentCardIndex: number,
    set: Set,
  ) => Promise<void>;
  handlePlayWordPronunciation: (card: Card) => void;
  get3RandomWrongAnswers: (currentCard: Card) => string[];
}

export const useFlashcard = ({
  set,
  isSoundEnabled,
  successSound,
  finishSound,
  playWordPronunciation,
}: UseFlashcardProps): UseFlashcardReturn => {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sortedCardIds, setSortedCardIds] = useState<string[]>([]);
  const [orderedCards, setOrderedCards] = useState(set.cards);

  //* Tính toán currentCard và cardStatus
  const currentCard = useMemo(
    () => orderedCards[currentCardIndex],
    [orderedCards, currentCardIndex],
  );
  let cardStatus = "Not studied";
  if (currentCard.correctCount) {
    if (currentCard.correctCount >= 2) {
      cardStatus = "Known";
    } else {
      cardStatus = "Learning";
    }
  }

  //* Lưu kết quả trả lời và chuyển sang card tiếp theo
  const saveAnswer = useCallback(
    async (isCorrect: boolean, currentCardIndex: number, set: Set) => {
      const cardId = orderedCards[currentCardIndex].id;
      const setId = set.id;
      await SaveAnswer(setId, cardId, isCorrect).catch(() => {
        toast.error("An error occurred while saving the answer!");
      });

      if (currentCardIndex < orderedCards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
      } else {
        const remainingCards = orderedCards.filter(
          (card) => card.correctCount === null || card.correctCount < 2,
        );
        setOrderedCards(remainingCards);
        setCurrentCardIndex(0);
      }

      if (isCorrect) {
        if (successSound && isSoundEnabled) {
          successSound
            .play()
            .catch((err) => toast.error("Error playing success sound:", err));
        }

        toast.dismiss();
        toast.success("Good job!");
      } else {
        toast.dismiss();
        toast.error("Keep going!");
      }
    },
    [orderedCards, isSoundEnabled, successSound],
  );

  const isSoundPlaying = useRef(false);
  const handlePlayWordPronunciation = (card: Card) => {
    const COOLDOWN_TIME = 1000;

    if (isSoundPlaying.current) {
      toast.dismiss();
      toast.error("Please wait a moment before playing again!");
      return;
    }

    if (isSoundEnabled) {
      try {
        isSoundPlaying.current = true;
        playWordPronunciation(card.term);
        setTimeout(() => {
          isSoundPlaying.current = false;
        }, COOLDOWN_TIME);
      } catch (err) {
        toast.error("Error playing pronunciation!");
        isSoundPlaying.current = false;
      }
    }
  };

  const get3RandomWrongAnswers = useCallback(
    (currentCard: Card): string[] => {
      const wrongAnswers = set.cards
        .filter((card) => card.id !== currentCard.id)
        .map((card) => card.definition);
      const shuffled = wrongAnswers.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    },
    [set.cards],
  );

  useEffect(() => {
    //* Khởi tạo danh sách thứ tự các cards theo id và sắp xếp
    if (sortedCardIds.length === 0 && set.cards.length > 0) {
      const sorted = [...set.cards].sort((cardA, cardB) => {
        const getOrder = (card: (typeof set.cards)[number]) => {
          if (card.correctCount === null) return 0;
          if (card.correctCount < 2) return 1;
          return 2;
        };
        return getOrder(cardA) - getOrder(cardB);
      });
      setSortedCardIds(sorted.map((card) => card.id));
      setOrderedCards(sorted);
    }

    //* Cập nhật và sắp xếp cards mới theo thứ tự card id đã khởi tạo
    if (sortedCardIds.length > 0) {
      const newCardsMap = new Map(set.cards.map((card) => [card.id, card]));
      const newOrderedCards = sortedCardIds
        .map((id) => newCardsMap.get(id))
        .filter((card) => card !== undefined) as Card[];
      setOrderedCards(newOrderedCards);
    }
  }, [set, sortedCardIds]);

  //* Kiểm tra xem đã học hết tất cả các cards chưa
  useEffect(() => {
    const finished = orderedCards.every(
      (card) => card.correctCount && card.correctCount >= 2,
    );

    if (finished) {
      if (finishSound && isSoundEnabled) {
        finishSound
          .play()
          .catch((err) => toast.error("Error playing finish sound:", err));
      }

      toast.dismiss();
      toast.success("You have completed all the cards!", { duration: 3000 });
      router.replace(`/library/${set.id}`);
    }
  }, [set, isSoundEnabled, orderedCards, router, finishSound]);

  return {
    currentCardIndex,
    setCurrentCardIndex,
    sortedCardIds,
    orderedCards,
    currentCard,
    cardStatus,
    saveAnswer,
    handlePlayWordPronunciation,
    get3RandomWrongAnswers,
  };
};
