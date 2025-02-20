import { NavLink } from "../clients/nav-link";
import { ToggleTheme } from "../clients/toggle-theme";
import { Separator } from "../clients/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";

export async function MobileNav({ isAuth }: { isAuth: boolean }) {
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
              <NavLink className="mr-0" href="/auth">
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
