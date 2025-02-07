import { UserType } from "./data.type";
import { HttpErrorType } from "./error.type";

export type EditProfileInputType = Partial<
  Pick<UserType, "username" | "email" | "bio">
>;

export type EditProfileStateType = {
  input: EditProfileInputType;
  error?: HttpErrorType;
  success: boolean;
};
