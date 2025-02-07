import type { BaseEntityType } from "./base-entity.type";

export type PostType = BaseEntityType & {
  title: string;
  slug: string;
  content: string;
  wordCount: number;
  readingTime: number;
  viewCount: number;
};

export type PostTagsType = PostType & {
  tags: TagType[];
};

export type TagType = BaseEntityType & {
  name: string;
};

export type UserType = BaseEntityType & {
  role: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  bio?: string;
  avatar?: string;
};
