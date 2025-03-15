import { z } from "zod";

export const importFormSchema = z.object({
  importText: z.string(),
  termSeparator: z.enum(["tab", "comma", "custom"]),
  cardSeparator: z.enum(["newline", "semicolon", "custom"]),
  customTermSeparator: z.string().default(":"),
  customCardSeparator: z.string().default("\n\n"),
});

export type ImportFormInput = z.infer<typeof importFormSchema>;
