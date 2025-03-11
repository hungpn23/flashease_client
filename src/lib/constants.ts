export const protectedRoutes = ["/profile", "/library", "/explore"];
export const publicRoutes = ["/login", "/register", "/welcome"];

export enum VisibleTo {
  EVERYONE = "everyone",
  JUST_ME = "just me",
  PEOPLE_WITH_A_PASSCODE = "people with a passcode",
}
