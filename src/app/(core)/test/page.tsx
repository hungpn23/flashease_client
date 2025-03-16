import { isAuthenticated } from "@/lib/is-authenticated";
import { redirect } from "next/navigation";

export default async function RedirectOnly() {
  const isAuth = await isAuthenticated();
  redirect(isAuth ? "/library" : "/welcome");
}
