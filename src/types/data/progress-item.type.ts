import { BaseEntityType } from "../base-entity.type";
import { CardType } from "./card.type";
import { ProgressType } from "./progress.type";

export type ProgressItemType = BaseEntityType & {
  correctCount?: number;
  progress: ProgressType;
  card: CardType;
};
