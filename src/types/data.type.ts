import { EditableBy, VisibleTo } from "@/lib/constants";
import type { BaseEntityType } from "./base-entity.type";

export type SetType = BaseEntityType & {
  name: string;
  slug: string;
  description?: string;
  author: string;
  visibleTo: VisibleTo;
  editableBy: EditableBy;
};

export type UserType = BaseEntityType & {
  role: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  bio?: string;
  avatar?: string;
};
