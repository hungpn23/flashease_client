import { VisibleTo } from "@/lib/constants";
import { HttpError } from "@/types/error.type";
import { z } from "zod";

export const createSetSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional(),
    visibleTo: z.enum([
      VisibleTo.JUST_ME,
      VisibleTo.PEOPLE_WITH_A_PASSCODE,
      VisibleTo.EVERYONE,
    ]),
    passcode: z.string().refine(
      (_val) => {
        return true;
      },
      { message: "Passcode is required" },
    ),
    cards: z
      .array(
        z.object({
          term: z.string().min(1),
          definition: z.string().min(1),
        }),
      )
      .min(4, { message: "At least 4 cards is required" }),
  })
  .refine(
    (data) => {
      if (data.visibleTo === VisibleTo.PEOPLE_WITH_A_PASSCODE) {
        return data.passcode.length > 0;
      }
      return true;
    },
    {
      message:
        "Passcode is required when visibility is set to 'people with a passcode'",
      path: ["passcode"],
    },
  );

export type CreateSetInput = z.infer<typeof createSetSchema>;
export type CreateSetState = {
  input?: CreateSetInput;
  error?: HttpError;
  success?: boolean;
};
