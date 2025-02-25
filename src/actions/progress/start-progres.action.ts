"use server";

import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import {
  ProgressType,
  StartProgressInputType,
  StartProgressStateType,
} from "@/types/data/progress.type";
import { redirect } from "next/navigation";

export async function startProgress(
  previousState: StartProgressStateType,
  formData: FormData,
) {
  const input: StartProgressInputType = {
    id: formData.get("id") as string,
    password: formData.get("password") as string | undefined,
  };
  const accessToken = (await cookies()).get("access_token")?.value;

  if (input.password === "") input.password = undefined;
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
    } as StartProgressStateType;
  }

  const progress: ProgressType = await response.json();

  redirect(`/my-progress/${progress.id}`);
}
