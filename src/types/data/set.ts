import { VisibleTo } from "@/lib/constants";
import { BaseEntity } from "../base-entity.type";
import { Card } from "./card.type";
import { User } from "./user";
import { Folder } from "./folder.type";

export type Set = BaseEntity & {
  name: string;
  description?: string;
  author: string;
  visibleTo: VisibleTo;
  passcode?: string;
  user?: User;
  folder?: Folder;
  cards: Card[];
};

export type SetMetadata = {
  totalCards: number;
  notStudiedCount: number;
  learningCount: number;
  knownCount: number;
};

export type SetDetail = {
  set: Set;
  metadata: SetMetadata;
};
