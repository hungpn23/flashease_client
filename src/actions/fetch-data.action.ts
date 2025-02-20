"use server";

import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import type { HttpErrorType } from "@/types/error.type";
import type { SetType, UserType } from "@/types/data.type";
import { PaginatedType } from "@/types/paginated.type";

export async function findUser() {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) return data as HttpErrorType;

  return data as UserType;
}

export async function findPublicSets(
  currentPage: number,
  take: number,
  order: string,
) {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(
    `${BASE_URL}/set/all?page=${currentPage}&take=${take}&order=${order}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken || "nothing"}`,
      },
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) return data as HttpErrorType;

  return data as PaginatedType<SetType>;
}

export async function findMySets(
  currentPage: number,
  take: number,
  order: string,
) {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(
    `${BASE_URL}/set/my-sets?page=${currentPage}&take=${take}&order=${order}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken || "nothing"}`,
      },
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) return data as HttpErrorType;

  return data as PaginatedType<SetType>;
}
