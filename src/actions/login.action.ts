"use server";

import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { LoginInputType, LoginStateType } from "@/types/auth.type";
import { BASE_URL } from "@/lib/constants";

export async function login(
  _previousState: LoginStateType,
  formData: FormData,
) {
  const input: LoginInputType = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      input,
      error: data,
    } as LoginStateType;
  }

  const { accessToken } = data;

  (await cookies()).set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    expires: jwtDecode(accessToken).exp! * 1000,
  });

  redirect("/home");
}
