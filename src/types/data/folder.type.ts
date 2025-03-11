import { BaseEntity } from "../base-entity.type";
import { Set } from "../set";

export type Folder = BaseEntity & {
  name: string;
  description?: string;
  sets?: Set[];
};
