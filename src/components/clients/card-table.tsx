"use client";

import { TCard } from "@/types/data/card.type";
import { useActionState, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { editSetCards } from "@/actions/set/edit-set-cards.action";
import { TEditCardsState } from "@/types/data/set.type";

type ValidationStateType = {
  [cardId: string]: {
    term: boolean;
    definition: boolean;
  };
};

interface Card {
  term: string;
  definition: string;
}

export function CardTable({
  cardsInput,
  setId,
}: {
  cardsInput: TCard[];
  setId: string;
}) {
  const initCards: Card[] = cardsInput.map(({ term, definition }) => ({
    term,
    definition,
  }));
  const [cards, setCards] = useState<Card[]>(initCards);
  const [validationState, setValidationState] = useState<ValidationStateType>(
    () => {
      const initial: ValidationStateType = {};

      initCards.forEach((_, index) => {
        initial[index] = {
          term: true,
          definition: true,
        };
      });

      return initial;
    },
  );

  const validateField = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const handleChange = (
    index: number,
    field: "term" | "definition",
    value: string,
  ) => {
    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? ({ ...card, [field]: value } satisfies TCard) : card,
      ),
    );

    setValidationState((prevState) => {
      const currentState = prevState[index];
      const updatedState = {
        ...currentState,
        [field]: validateField(value),
      };

      return {
        ...prevState,
        [index]: updatedState,
      } satisfies ValidationStateType;
    });
  };

  const handleDelete = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));

    setValidationState((prev) => {
      delete prev[index];
      return prev;
    });
  };

  const handleSave = async (e: React.MouseEvent<HTMLElement>) => {
    const errors: string[] = [];

    if (cards.length < 4) {
      e.preventDefault();
      return toast.error("Minimum 4 cards required");
    }

    cards.forEach((card, index) => {
      if (!validateField(card.term))
        errors.push(`Card #${index + 1} has empty term`);

      if (!validateField(card.definition))
        errors.push(`Card #${index + 1} has empty definition`);
    });

    if (errors.length > 0) {
      e.preventDefault();
      return toast.error(() => (
        <div className="mt-2">
          {errors.map((error, index) => (
            <div key={index} className="text-sm">
              {error}
            </div>
          ))}
        </div>
      ));
    }

    console.log("🚀 ~ cards.forEach ~ cards:", cards);
    toast.success("Cards saved successfully");
    e.preventDefault();
  };

  const handleAddCard = () => {
    const newIndex = cards.length;
    const newCard: TCard = {
      id: `temp-${newIndex}`,
      term: "",
      definition: "",
    };

    setCards((prev) => [...prev, newCard]);
    setValidationState((prev) => ({
      ...prev,
      [newIndex]: {
        term: false,
        definition: false,
      },
    }));
  };

  // ======== HANDLE FORM ======== //
  const initState: TEditCardsState = {
    input: {
      id: setId,
      cards,
    },
    error: undefined,
  };

  const [state, action, isLoading] = useActionState<TEditCardsState, FormData>(
    editSetCards,
    initState,
  );

  useEffect(() => {
    if (state.error && state.error.details === undefined)
      toast.error(state.error?.message);
  }, [state]);

  return (
    <Table>
      <TableCaption className="my-4">
        <div className="flex justify-end gap-4">
          <Button
            className="text-foreground"
            onClick={handleAddCard}
            variant="outline"
          >
            Add card
            <Plus className="inline h-4 w-4" />
          </Button>

          <form action={action}>
            <input type="hidden" name="id" value={setId} />
            <input type="hidden" name="cards" value={JSON.stringify(cards)} />

            <Button disabled={isLoading} onClick={handleSave} type="submit">
              Save changes
            </Button>
          </form>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-fit">No.</TableHead>
          <TableHead>Term</TableHead>
          <TableHead>Definition</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map(({ term, definition }, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Input
                value={term}
                onChange={(e) => handleChange(index, "term", e.target.value)}
                className={cn(
                  !validationState[index]?.term
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "",
                )}
              />
            </TableCell>
            <TableCell>
              <Input
                value={definition}
                onChange={(e) =>
                  handleChange(index, "definition", e.target.value)
                }
                className={cn(
                  !validationState[index]?.definition
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "",
                )}
              />
            </TableCell>
            <TableCell>
              <button
                onClick={() => handleDelete(index)}
                className="mx-auto flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total cards</TableCell>
          <TableCell className="text-right">{cards.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
