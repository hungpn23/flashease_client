import { BaseEntityType } from "../base-entity.type";
import { ProgressItemType } from "./progress-item.type";
import { SetType } from "./set.type";

export type CardType = BaseEntityType & {
  term: string;
  definition: string;
  set: SetType;
  progressItems: ProgressItemType[];
};
