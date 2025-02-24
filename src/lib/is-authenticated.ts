import { findUser } from "@/actions/user/find-user.action";
import { cache } from "react";

export async function isAuthenticated() {
  const user = await findUser();

  if ("statusCode" in user) return false;

  return true;
}

// ! React will invalidate the cache for all memoized functions for each server request.
export const isAuthCached = cache(isAuthenticated);
