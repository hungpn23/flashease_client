export const protectedRoutes = ["/profile", "/library", "/explore"];
export const publicRoutes = ["/login", "/register", "/welcome"];

export enum VisibleTo {
  EVERYONE = "everyone",
  JUST_ME = "just me",
  PEOPLE_WITH_A_PASSCODE = "people with a passcode",
}

export const SERVER_URL = "http://server:3001/api/v1";
