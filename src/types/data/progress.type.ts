import { TBaseEntity } from "../base-entity.type";
import { THttpError } from "../error.type";
import { TProgressItem } from "./progress-item.type";
import { TSet } from "./set.type";
import { TUser } from "./user.type";

export type TProgress = TBaseEntity & {
  user: TUser;
  set: TSet;
  items: TProgressItem[];
};

export type TProgressDetail = {
  progress: TProgress;
  metadata: ProgressMetadata;
};

export type ProgressMetadata = {
  totalCards: number;
  notStudiedCount: number;
  learningCount: number;
  knownCount: number;
};

export type TStartProgressInput = Pick<TSet, "id"> & {
  password?: string;
};

export type TStartProgressState = {
  input: TStartProgressInput;
  error?: THttpError;
};
