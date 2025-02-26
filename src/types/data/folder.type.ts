import { TBaseEntity } from "../base-entity.type";
import { TSet } from "./set.type";

export type TFolder = TBaseEntity & {
  name: string;
  description?: string;
  sets: TSet[];
};
