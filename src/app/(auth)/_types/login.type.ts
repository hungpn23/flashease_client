import { HttpError } from "@/types/error.type";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 8 characters long" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type LoginState = {
  input?: LoginInput;
  error?: HttpError;
};
