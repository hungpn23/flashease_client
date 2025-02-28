export const protectedRoutes = ["/profile", "/library", "/explore"];
export const publicRoutes = ["/login", "/register", "/welcome"];

export const BASE_URL = "http://localhost:3001/api/v1";
export const IMAGE_HOST = "http://localhost:3001/";

export enum VisibleTo {
  EVERYONE = "everyone",
  JUST_ME = "just me",
  PEOPLE_WITH_A_PASSCODE = "people with a passcode",
}
