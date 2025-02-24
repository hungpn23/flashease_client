import { BaseEntityType } from "../base-entity.type";
import { ProgressItemType } from "./progress-item.type";
import { SetType } from "./set.type";
import { UserType } from "./user.type";

export type ProgressType = BaseEntityType & {
  user: UserType;
  set: SetType;
  items: ProgressItemType[];
};

export type MyProgressType = ProgressType & {
  metadata: ProgressMetadata;
};

export type ProgressMetadata = {
  totalCards: number;
  notStudiedCount: number;
  learningCount: number;
  knownCount: number;
};
