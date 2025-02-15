import { NavLink } from "../clients/nav-link";
import { ToggleTheme } from "../clients/toggle-theme";
import { Separator } from "../clients/separator";
import { isAuthenticated } from "@/lib/is-authenticated";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";

export async function MobileNav() {
  console.log("mobile nav called");
  const isAuth = await isAuthenticated();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden>

        <div className="flex h-full flex-col pt-6">
          {isAuth ? (
            <nav className="flex flex-col items-center gap-8">
              <NavLink className="mr-0" href="/profile">
                Profile
              </NavLink>
              <NavLink className="mr-0 last:mr-0" href="/logout">
                Logout
              </NavLink>

              <Separator direction="horizontal" />

              <ToggleTheme />
            </nav>
          ) : (
            <nav className="flex flex-col items-center gap-8">
              <NavLink className="mr-0" href="/authentication">
                Login
              </NavLink>

              <Separator direction="horizontal" />

              <ToggleTheme />
            </nav>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
