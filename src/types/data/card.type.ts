export type Card = {
  term: string;
  definition: string;
  correctCount: number | null;
};

export type CardValidation = {
  [cardId: string]: {
    term: boolean;
    definition: boolean;
  };
};
