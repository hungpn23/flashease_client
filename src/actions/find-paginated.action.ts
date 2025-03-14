"use server";

import { SERVER_URL } from "@/lib/constants";
import { HttpError } from "@/types/error.type";
import { Paginated } from "@/types/paginated.type";
import { cookies } from "next/headers";

export async function findPaginated<Entity>(
  path: string,
  currentPage: number,
  take: number,
  order: string,
) {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(
    `${SERVER_URL}${path}?page=${currentPage}&take=${take}&order=${order}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken || "nothing"}`,
      },
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) return data as HttpError;

  return data as Paginated<Entity>;
}
