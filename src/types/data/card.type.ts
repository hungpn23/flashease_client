import { TBaseEntity } from "../base-entity.type";
import { TProgressItem } from "./progress-item.type";
import { TSet } from "./set.type";

export type TCard = TBaseEntity & {
  term: string;
  definition: string;
  set?: TSet;
  progressItems?: TProgressItem[];
};
