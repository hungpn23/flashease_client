import { BaseEntityType } from "../base-entity.type";
import { HttpErrorType } from "../error.type";
import { ProgressItemType } from "./progress-item.type";
import { SetType } from "./set.type";
import { UserType } from "./user.type";

export type ProgressType = BaseEntityType & {
  user: UserType;
  set: SetType;
  items: ProgressItemType[];
};

export type ProgressDetailType = {
  progress: ProgressType;
  metadata: ProgressMetadata;
};

export type ProgressMetadata = {
  totalCards: number;
  notStudiedCount: number;
  learningCount: number;
  knownCount: number;
};

export type StartProgressInputType = Pick<SetType, "id"> & {
  password?: string;
};

export type StartProgressStateType = {
  input: StartProgressInputType;
  error?: HttpErrorType;
};
