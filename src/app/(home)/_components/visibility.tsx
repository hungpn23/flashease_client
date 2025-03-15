import { VisibleTo } from "@/lib/constants";
import { Globe, Lock, UserRound } from "lucide-react";

export function Visibility({ visibleTo }: { visibleTo: VisibleTo }) {
  switch (visibleTo) {
    case VisibleTo.EVERYONE:
      return <Globe className="h-4 w-4" />;
    case VisibleTo.JUST_ME:
      return <UserRound className="h-4 w-4" />;
    case VisibleTo.PEOPLE_WITH_A_PASSCODE:
      return <Lock className="h-4 w-4" />;
  }
}
