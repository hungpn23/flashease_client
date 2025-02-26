import { VisibleTo, EditableBy } from "@/lib/constants";
import { TBaseEntity } from "../base-entity.type";
import { TUser } from "./user.type";
import { TFolder } from "./folder.type";
import { TCard } from "./card.type";
import { TProgress } from "./progress.type";
import { THttpError } from "../error.type";

export type TSet = TBaseEntity & {
  name: string;
  description?: string;
  visibleTo: VisibleTo;
  visibleToPassword?: string;
  editableBy: EditableBy;
  editableByPassword?: string;
  user: TUser;
  folder: TFolder;
  cards: TCard[];
  progresses: TProgress[];
};

export type TSetDetail = {
  set: TSet;
  progress?: TProgress;
};

export type TEditSetInput = Partial<
  Pick<
    TSet,
    | "name"
    | "description"
    | "visibleTo"
    | "visibleToPassword"
    | "editableBy"
    | "editableByPassword"
  >
> &
  Pick<TSet, "id">;

export type TEditSetState = {
  input: TEditSetInput;
  error?: THttpError;
  success: boolean;
};

export type TEditCardsInput = Pick<TSet, "id" | "cards">;

export type TEditCardsState = {
  input: TEditCardsInput;
  error?: THttpError;
};
