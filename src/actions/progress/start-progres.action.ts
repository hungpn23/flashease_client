"use server";

import { BASE_URL, EditableBy, VisibleTo } from "@/lib/constants";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  StartProgressInputType,
  StartProgressStateType,
} from "@/types/data/progress.type";
import { EditSetStateType } from "@/types/data/set.type";

export async function startProgress(
  previousState: EditSetStateType,
  formData: FormData,
) {
  const input: StartProgressInputType = {
    id: formData.get("id") as string,
    password: formData.get("password") as string | undefined,
  };

  const accessToken = (await cookies()).get("access_token")?.value;

  if (!input.password) input.password = "";

  const response = await fetch(
    `${BASE_URL}/progress/start-progress/${input.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || "nothing"}`,
      },
      credentials: "include",
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    return {
      input: previousState.input,
      error: await response.json(),
      success: false,
    } as StartProgressStateType;
  }

  revalidatePath(`/my-set/${input.id}`);

  return {
    input,
    success: true,
  } as StartProgressStateType;
}
