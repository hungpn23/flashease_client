import { cookies } from "next/headers";
import * as jose from "jose";

export async function isAuthenticated() {
  const accessToken = (await cookies()).get("access_token")?.value || "";
  try {
    return !!(await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode("secret"),
    ));
  } catch (error) {
    return false;
  }
}
