export const protectedRoutes = [
  "/profile",
  "/my-set",
  "/saved-sets",
  "/explore",
];
export const publicRoutes = ["/auth"];

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
