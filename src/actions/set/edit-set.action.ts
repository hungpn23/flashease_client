"use server";

import { BASE_URL, EditableBy, VisibleTo } from "@/lib/constants";
import type { EditSetInputType, EditSetStateType } from "@/types/edit-set.type";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function editSet(
  previousState: EditSetStateType,
  formData: FormData,
) {
  const input: EditSetInputType = {
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
    } as EditSetStateType;
  }

  revalidatePath("/my-set");

  return {
    input,
    success: true,
  } as EditSetStateType;
}
