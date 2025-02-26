import { TBaseEntity } from "../base-entity.type";
import { TCard } from "./card.type";
import { TProgress } from "./progress.type";

export type TProgressItem = TBaseEntity & {
  correctCount?: number;
  progress: TProgress;
  card: TCard;
};
