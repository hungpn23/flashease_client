"use server";

import { BASE_URL } from "@/lib/constants";
import { HttpError } from "@/types/error.type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function UploadAvatar(
  _previousState: unknown,
  formData: FormData,
) {
  const accessToken = (await cookies()).get("access_token")?.value;

  const response = await fetch(`${BASE_URL}/user/upload-avatar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
    body: formData,
  });

  if (!response.ok) return (await response.json()) as HttpError;

  revalidatePath("/profile");
}
