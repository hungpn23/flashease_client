export const protectedRoutes = ["/profile", "/library", "/explore"];
export const publicRoutes = ["/login", "/register", "/welcome"];

export enum VisibleTo {
  EVERYONE = "everyone",
  JUST_ME = "just me",
  PEOPLE_WITH_A_PASSCODE = "people with a passcode",
}

const env = process.env.NODE_ENV;
export const APP_HOST =
  env === "development" ? "http://localhost" : "https://phamngochung.id.vn";

export const SERVER_URL =
  env === "development"
    ? "http://localhost:3001/api/v1"
    : "https://phamngochung.id.vn";
