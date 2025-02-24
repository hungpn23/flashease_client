import { VisibleTo, EditableBy } from "@/lib/constants";
import { BaseEntityType } from "../base-entity.type";
import { UserType } from "./user.type";
import { FolderType } from "./folder.type";
import { CardType } from "./card.type";
import { ProgressType } from "./progress.type";

export type SetType = BaseEntityType & {
  name: string;
  description?: string;
  visibleTo: VisibleTo;
  visibleToPassword?: string;
  editableBy: EditableBy;
  editableByPassword?: string;
  user: UserType;
  folder: FolderType;
  cards: CardType[];
  progresses: ProgressType[];
};

export type SetDetailType = {
  set: SetType;
  isLearning: boolean;
};
