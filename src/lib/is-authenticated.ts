import { getUser } from "@/actions/fetch-data.action";

export async function isAuthenticated() {
  const user = await getUser();

  if ("statusCode" in user) return false;

  return true;
}
