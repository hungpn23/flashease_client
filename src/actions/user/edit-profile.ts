"use server";

import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";
import {
  EditProfileInput,
  EditProfileState,
} from "@/types/user/edit-profile.type";

export async function EditProfile(
  previousState: EditProfileState,
  formData: FormData,
) {
  const input: EditProfileInput = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    bio: formData.get("bio") as string | undefined,
  };

  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${BASE_URL}/user`, {
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
    } as EditProfileState;
  }

  revalidatePath("/profile");

  return {
    input: await response.json(),
    error: undefined,
    success: true,
  } as EditProfileState;
}
