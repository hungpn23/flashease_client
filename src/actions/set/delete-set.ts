"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function DeleteSet(setId: string) {
  const accessToken = (await cookies()).get("access_token")?.value;

  const response = await fetch(
    `${process.env.SERVER_URL}/set/delete-set/${setId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || "nothing"}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) return false;

  redirect("/library");
}
