import { BaseEntity } from "../base-entity.type";
import { Set } from "./set.type";

export type Card = {
  term: string;
  definition: string;
  correctCount?: number;
};

export type CardValidation = {
  [cardId: string]: {
    term: boolean;
    definition: boolean;
  };
};
