import Link from "next/link";
import { NavLink } from "../clients/nav-link";
import { Separator } from "../clients/separator";
import { ToggleTheme } from "../clients/toggle-theme";
import { isAuthenticated } from "@/lib/is-authenticated";
import { MobileNav } from "./mobile-nav";
import { LogoutBtn } from "../clients/logout-btn";
import { Button } from "../ui/button";

export async function Header() {
  console.log("header called");
  const isAuth = await isAuthenticated();

  return (
    <header className="fixed top-0 z-10 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          Flash
          <span className="text-link">Ease</span>
        </Link>

        {isAuth ? (
          <nav className="hidden items-center gap-2 md:flex">
            {/* <Button className="mr-4 text-base font-medium">create</Button> */}
            <NavLink href="/profile">Profile</NavLink>
            <LogoutBtn />

            <Separator />

            <ToggleTheme />
          </nav>
        ) : (
          <nav className="hidden items-center gap-2 md:flex">
            <NavLink href="/authentication">Login</NavLink>

            <Separator />

            <ToggleTheme />
          </nav>
        )}

        <MobileNav />
      </div>
    </header>
  );
}
