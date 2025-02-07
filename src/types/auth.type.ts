import type { HttpErrorType } from "./error.type";

export type LoginInputType = {
  email: string;
  password: string;
};

export type RegisterInputType = LoginInputType & {
  confirmPassword: string;
};

export type LoginStateType = {
  input: LoginInputType;
  error: HttpErrorType;
} | null;
