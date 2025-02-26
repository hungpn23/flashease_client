"use server";

import { BASE_URL, EditableBy, VisibleTo } from "@/lib/constants";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { TEditSetState, TEditSetInput } from "@/types/data/set.type";

export async function editSet(
  previousState: TEditSetState,
  formData: FormData,
) {
  const input: TEditSetInput = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    visibleTo: formData.get("visibleTo") as VisibleTo,
    visibleToPassword: formData.get("visibleToPassword") as string,
    editableBy: formData.get("editableBy") as EditableBy,
    editableByPassword: formData.get("editableByPassword") as string,
  };

  const accessToken = (await cookies()).get("access_token")?.value;

  const response = await fetch(`${BASE_URL}/set/${input.id}`, {
    method: "PATCH",
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
      success: false,
    } as TEditSetState;
  }

  revalidatePath("/my-set");

  return {
    input,
    success: true,
  } as TEditSetState;
}
