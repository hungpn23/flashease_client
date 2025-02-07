import { NavLink } from "../clients/nav-link";
import { ToggleTheme } from "../clients/toggle-theme";
import { Separator } from "../clients/separator";
import { getUser } from "@/actions/fetch-data.action";
import { isAuthenticated } from "@/lib/is-authenticated";

export async function MobileNav() {
  const isAuth = await isAuthenticated();

  return (
    <div className="flex h-full flex-col pt-6">
      {isAuth ? (
        <nav className="flex flex-col items-center gap-8">
          <NavLink className="mr-0" href="/home">
            Home
          </NavLink>
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
          <NavLink className="mr-0" href="/login">
            Login
          </NavLink>

          <Separator direction="horizontal" />

          <ToggleTheme />
        </nav>
      )}
    </div>
  );
}
