import { BaseEntityType } from "../base-entity.type";
import { SetType } from "./set.type";

export type FolderType = BaseEntityType & {
  name: string;
  description?: string;
  sets: SetType[];
};
