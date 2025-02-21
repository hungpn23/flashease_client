import { EditableBy, VisibleTo } from "@/lib/constants";
import type { BaseEntityType } from "./base-entity.type";

export type SetType = BaseEntityType & {
  id: string;
  name: string;
  slug: string;
  description?: string;
  author: string;
  visibleTo: VisibleTo;
  visibleToPassword?: string;
  editableBy: EditableBy;
  editableByPassword?: string;
};

export type UserType = BaseEntityType & {
  role: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  bio?: string;
  avatar?: string;
};
