import { NavLink } from "../clients/nav-link";
import { ToggleTheme } from "../clients/toggle-theme";
import { Separator } from "../clients/separator";

export async function MobileNav() {
  return (
    <div className="flex h-full flex-col pt-6">
      <nav className="flex flex-col items-center gap-8">
        <NavLink className="mr-0" href="/profile">
          Profile
        </NavLink>

        <NavLink className="mr-0" href="/blog">
          Blog
        </NavLink>

        <NavLink className="mr-0 last:mr-0" href="/projects">
          Projects
        </NavLink>

        <Separator direction="horizontal" />

        <ToggleTheme />
      </nav>
    </div>
  );
}
