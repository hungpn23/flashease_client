import type { THttpError } from "./error.type";

export type TAuthInput = {
  email: string;
  password: string;
};

export type TAuthState = {
  input: TAuthInput;
  error: THttpError;
} | null;
