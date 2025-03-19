import { VisibleTo } from "@/lib/constants";
import { BaseEntity } from "../base-entity.type";
import { Card } from "./card.type";
import { User } from "./user.type";
import { Folder } from "./folder.type";

export type Set = BaseEntity & {
  name: string;
  description?: string;
  visibleTo: VisibleTo;
  passcode?: string;
  author: User;
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
