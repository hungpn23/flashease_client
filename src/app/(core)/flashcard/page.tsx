import { redirect } from "next/navigation";

export default function RedirectOnly() {
  redirect("/library");
}
