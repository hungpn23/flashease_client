"use server";

import { BASE_URL } from "@/lib/constants";
import { BaseEntityType } from "@/types/base-entity.type";
import { HttpErrorType } from "@/types/error.type";
import { PaginatedType } from "@/types/paginated.type";
import { cookies } from "next/headers";

export async function findPaginated<Entity>(
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
