import { EditableBy, VisibleTo } from "@/lib/constants";
import type { BaseEntityType } from "./base-entity.type";

export type SetType = BaseEntityType & {
  name: string;
  description?: string;
  visibleTo: VisibleTo;
  visibleToPassword?: string;
  editableBy: EditableBy;
  editableByPassword?: string;
  user: UserType;
  cards: CardType[];
};

export type SetDetailType = SetType & {
  isLearning: boolean;
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

export type ProgressType = BaseEntityType & {
  items: ProgressItemType[];
};

export type MyProgressType = BaseEntityType &
  Pick<SetType, "name" | "description"> &
  Pick<UserType, "username"> &
  Pick<ProgressType, "createdAt"> & {
    metadata: ProgressMetadata;
  };

export type ProgressMetadata = {
  totalCards: number;
  notStudiedCount: number;
  learningCount: number;
  knownCount: number;
};

export type ProgressItemType = BaseEntityType & {
  correctCount?: number;
};
