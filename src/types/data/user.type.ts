import { BaseEntityType } from "../base-entity.type";
import { ProgressType } from "./progress.type";
import { SetType } from "./set.type";

export type UserType = BaseEntityType & {
  role: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  bio?: string;
  avatar?: string;
  sets: SetType[];
  progresses: ProgressType[];
};
