import { BaseEntity } from "../base-entity.type";
import { Set } from "./set.type";

export type User = BaseEntity & {
  role: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  bio?: string;
  avatar?: string;
  sets?: Set[];
};
