import { VisibleTo } from "@/lib/constants";
import { BaseEntity } from "../base-entity.type";
import { Card } from "../data/card.type";
import { Folder } from "../data/folder.type";
import { User } from "../data/user.type";

export type Set = BaseEntity & {
  name: string;
  description?: string;
  author: string;
  visibleTo: VisibleTo;
  passcode?: string;
  user?: User;
  folder?: Folder;
  cards?: Card[];
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
