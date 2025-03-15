import { HttpError } from "@/types/error.type";
import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterState = {
  input?: RegisterInput;
  error?: HttpError;
};
