import { z } from "zod";
import { HttpError } from "../error.type";

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must have at least 6 characters" }),
  email: z.string().email({ message: "Email is required" }),
  bio: z.string().optional(),
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;
export type EditProfileState = {
  input?: EditProfileInput;
  error?: HttpError;
  success?: boolean;
};
