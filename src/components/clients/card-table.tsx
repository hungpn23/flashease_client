"use client";

import { CardType } from "@/types/data/card.type";
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
import { Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/lib/constants";
import { editSetCards } from "@/actions/set/edit-set-cards.action";
import { EditSetCardsStateType } from "@/types/data/set.type";

type ValidationStateType = {
  [cardId: string]: {
    term: boolean;
    definition: boolean;
  };
};

export function CardTable({
  initCards,
  setId,
}: {
  initCards: CardType[];
  setId: string;
}) {
  const [cards, setCards] = useState<CardType[]>(initCards);
  const [validationState, setValidationState] = useState<ValidationStateType>(
    () => {
      const initial: ValidationStateType = {};

      initCards.forEach((card) => {
        initial[card.id] = {
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
    cardId: string,
    field: "term" | "definition",
    value: string,
  ) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? ({ ...card, [field]: value } satisfies CardType)
          : card,
      ),
    );

    setValidationState((prevState) => {
      const currentState = prevState[cardId];
      const updatedState = {
        ...currentState,
        [field]: validateField(value),
      };

      return {
        ...prevState,
        [cardId]: updatedState,
      } satisfies ValidationStateType;
    });
  };

  const handleDelete = (id: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));

    setValidationState((prev) => {
      delete prev[id];
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
      return toast.error((_t) => (
        <div className="mt-2">
          {errors.map((error, index) => (
            <div key={index} className="text-sm">
              {error}
            </div>
          ))}
        </div>
      ));
    }

    toast.success("Cards saved successfully");
  };

  const initState: EditSetCardsStateType = {
    input: {
      id: setId,
      cards,
    },
    error: undefined,
  };

  const [state, action, isLoading] = useActionState<
    EditSetCardsStateType,
    FormData
  >(editSetCards, initState);

  useEffect(() => {
    if (state.error && state.error.details === undefined)
      toast.error(state.error?.message);
  }, [state]);

  return (
    <Table>
      <TableCaption className="my-4">
        <form action={action}>
          <input type="hidden" name="id" value={setId} />
          <input type="hidden" name="cards" value={JSON.stringify(cards)} />

          <Button disabled={isLoading} onClick={handleSave} type="submit">
            Save changes
          </Button>
        </form>
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
        {cards.map(({ id, term, definition }, index) => (
          <TableRow key={id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Input
                value={term}
                onChange={(e) => handleChange(id, "term", e.target.value)}
                className={cn(
                  !validationState[id]?.term
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "",
                )}
              />
            </TableCell>
            <TableCell>
              <Input
                value={definition}
                onChange={(e) => handleChange(id, "definition", e.target.value)}
                className={cn(
                  !validationState[id]?.definition
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "",
                )}
              />
            </TableCell>
            <TableCell>
              <button
                onClick={() => handleDelete(id)}
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
