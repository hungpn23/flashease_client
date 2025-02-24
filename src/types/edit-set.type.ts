import { SetType } from "./data/set.type";
import { HttpErrorType } from "./error.type";

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
