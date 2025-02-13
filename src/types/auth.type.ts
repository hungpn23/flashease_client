import type { HttpErrorType } from "./error.type";

export type AuthInputType = {
  email: string;
  password: string;
};

export type AuthStateType = {
  input: AuthInputType;
  error: HttpErrorType;
} | null;
