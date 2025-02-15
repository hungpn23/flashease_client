export const protectedRoutes = ["/profile"];
export const publicRoutes = ["/authentication"];

export const BASE_URL = "http://localhost:3001/api/v1";
export const IMAGE_HOST = "http://localhost:3001/";

export enum VisibleTo {
  EVERYONE = "everyone",
  JUST_ME = "just me",
  PEOPLE_WITH_A_PASSWORD = "people with a password",
}

export enum EditableBy {
  JUST_ME = "just me",
  PEOPLE_WITH_A_PASSWORD = "people with a password",
}
