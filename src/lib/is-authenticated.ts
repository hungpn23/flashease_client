import { getUser } from "@/actions/fetch-data.action";
import { cache } from "react";

export async function isAuthenticated() {
  const user = await getUser();

  if ("statusCode" in user) return false;

  return true;
}

export const isAuthCached = cache(isAuthenticated);
