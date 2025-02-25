import { VisibleTo, EditableBy } from "@/lib/constants";
import { BaseEntityType } from "../base-entity.type";
import { UserType } from "./user.type";
import { FolderType } from "./folder.type";
import { CardType } from "./card.type";
import { ProgressType } from "./progress.type";
import { HttpErrorType } from "../error.type";

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
  progress?: ProgressType;
};

export type EditSetInputType = Partial<
  Pick<
    SetType,
    | "name"
    | "description"
    | "visibleTo"
    | "visibleToPassword"
    | "editableBy"
    | "editableByPassword"
  >
> &
  Pick<SetType, "id">;

export type EditSetStateType = {
  input: EditSetInputType;
  error?: HttpErrorType;
  success: boolean;
};
