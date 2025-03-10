import { cookies } from "next/headers";
import { verifyJwt } from "./jwt-verify";

export async function isAuthenticated() {
  const accessToken = (await cookies()).get("access_token")?.value || "";
  return await verifyJwt(accessToken);
}
