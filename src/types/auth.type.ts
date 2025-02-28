import type { HttpError } from "./error.type";

export type AuthInput = {
  email: string;
  password: string;
};

export type AuthState = {
  input: AuthInput;
  error: HttpError;
} | null;
