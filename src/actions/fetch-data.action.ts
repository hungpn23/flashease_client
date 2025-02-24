"use server";

import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import type { HttpErrorType } from "@/types/error.type";
import { PaginatedType } from "@/types/paginated.type";
import { BaseEntityType } from "@/types/base-entity.type";
import { SetDetailType } from "@/types/data/set.type";
import { UserType } from "@/types/data/user.type";

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

export async function findPaginated<Entity extends BaseEntityType>(
  path: string,
  currentPage: number,
  take: number,
  order: string,
) {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(
    `${BASE_URL}${path}?page=${currentPage}&take=${take}&order=${order}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken || "nothing"}`,
      },
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) return data as HttpErrorType;

  return data as PaginatedType<Entity>;
}

export async function findSetDetail(id: string, path: "my-set" | "public") {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${BASE_URL}/set/${path}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) return data as HttpErrorType;

  return data as SetDetailType;
}
