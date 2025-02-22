import { EditableBy, VisibleTo } from "@/lib/constants";
import type { BaseEntityType } from "./base-entity.type";

export type SetType = BaseEntityType & {
  id: string;
  name: string;
  description?: string;
  visibleTo: VisibleTo;
  visibleToPassword?: string;
  editableBy: EditableBy;
  editableByPassword?: string;
  user: UserType;
  cards: CardType[];
};

export type UserType = BaseEntityType & {
  role: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  bio?: string;
  avatar?: string;
};

export type CardType = BaseEntityType & {
  term: string;
  definition: string;
};
