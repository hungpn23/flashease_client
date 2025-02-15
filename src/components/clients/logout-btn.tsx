import { logout } from "@/actions/auth.action";

export function LogoutBtn() {
  return (
    <button
      onClick={logout}
      className="mr-4 text-base font-medium last:mr-4 hover:underline hover:underline-offset-4"
    >
      Logout
    </button>
  );
}
