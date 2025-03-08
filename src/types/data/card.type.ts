import { BaseEntity } from "../base-entity.type";

export type Card = BaseEntity & {
  term: string;
  definition: string;
  correctCount: number | null;
};
