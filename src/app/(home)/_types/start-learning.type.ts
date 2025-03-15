import { HttpError } from "@/types/error.type";
import { z } from "zod";

export const startLearningSchema = z.object({
  passcode: z
    .string()
    .min(8, { message: "Passcode must have at least 8 characters" }),
});

export type StartLearningInput = z.infer<typeof startLearningSchema>;
export type StartLearningState = {
  input?: StartLearningInput;
  error?: HttpError;
};
