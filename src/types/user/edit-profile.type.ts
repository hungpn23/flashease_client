import { z } from "zod";
import { HttpError } from "../error.type";

export const editProfileSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Username is required" }),
  bio: z.string().optional(),
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;
export type EditProfileState = {
  input?: EditProfileInput;
  error?: HttpError;
  success?: boolean;
};
