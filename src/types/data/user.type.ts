import { TBaseEntity } from "../base-entity.type";
import { TProgress } from "./progress.type";
import { TSet } from "./set.type";

export type TUser = TBaseEntity & {
  role: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  bio?: string;
  avatar?: string;
  sets: TSet[];
  progresses: TProgress[];
};
