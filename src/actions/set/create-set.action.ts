"use server";

import { BASE_URL, VisibleTo } from "@/lib/constants";
import { cookies } from "next/headers";
import { CreateSetInput, CreateSetState } from "@/types/set/create-set.type";
import { redirect } from "next/navigation";

export async function createSetAction(
  hello: string,
  previousState: CreateSetState,
  formData: FormData,
) {
  console.log("🚀 ~ hello:", hello);
  const input: CreateSetInput = {
    name: formData.get("name") as string,
    description: formData.get("description") as string | undefined,
    visibleTo: formData.get("visibleTo") as VisibleTo,
    passcode: formData.get("passcode") as string,
    cards: JSON.parse(formData.get("cards") as string),
  };

  const accessToken = (await cookies()).get("access_token")?.value;

  const response = await fetch(`${BASE_URL}/set/create-set`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    return {
      input: previousState.input,
      error: await response.json(),
    } as CreateSetState;
  }

  redirect("/library");
}
