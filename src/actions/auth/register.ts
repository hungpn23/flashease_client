"use server";

import { BASE_URL } from "@/lib/constants";
import { RegisterInput, RegisterState } from "@/types/auth/register.type";
import { redirect } from "next/navigation";

export async function registerAction(
  _previousState: RegisterState,
  formData: FormData,
) {
  const input: RegisterInput = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    return {
      input,
      error: await response.json(),
    } as RegisterState;
  }

  redirect("/login");
}
