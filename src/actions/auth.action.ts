"use server";

import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { AuthInputType, AuthStateType } from "@/types/auth.type";
import { BASE_URL } from "@/lib/constants";

export async function login(_previousState: AuthStateType, formData: FormData) {
  const input: AuthInputType = {
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
    } as AuthStateType;
  }

  const { accessToken } = data;

  (await cookies()).set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    expires: jwtDecode(accessToken).exp! * 1000,
  });

  redirect("/");
}

export async function register(
  _previousState: AuthStateType,
  formData: FormData,
) {
  const input: AuthInputType = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
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
    } as AuthStateType;
  }

  redirect("/authentication");
}

export async function logout() {
  const cookieStore = await cookies();

  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) redirect("/");

  cookieStore.delete("access_token");

  redirect("/authentication");
}
