import { jwtDecode } from "jwt-decode";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import * as jose from "jose";
import { verifyJwt } from "@/lib/jwt-verify";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get("accessToken") || "";
  const exp = jwtDecode(accessToken).exp! * 1000;

  const isValidToken = await verifyJwt(accessToken);

  return isValidToken
    ? new NextResponse(null, {
        status: 200,
        headers: {
          "Set-Cookie": `access_token=${accessToken}; HttpOnly; Expires=${exp}; Path=/`,
        },
      })
    : new NextResponse(null, {
        status: 401,
      });
}
