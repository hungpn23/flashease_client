import { jwtVerify } from "jose";

export async function verifyJwt(accessToken: string) {
  try {
    return !!(await jwtVerify(accessToken, new TextEncoder().encode("secret")));
  } catch (error) {
    return false;
  }
}
