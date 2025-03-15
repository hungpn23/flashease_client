"use server";

import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { LoginState, LoginInput } from "@/types/auth/login.type";
import { SERVER_URL } from "@/lib/constants";

export async function Login(_previousState: LoginState, formData: FormData) {
  const input: LoginInput = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const response = await fetch(`${SERVER_URL}/auth/login`, {
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
    } as LoginState;
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
