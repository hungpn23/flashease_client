import { SetMetadata } from "@/types/set";

export function ProgressBar({ metadata }: { metadata: SetMetadata }) {
  const { totalCards, notStudiedCount, learningCount, knownCount } = metadata;

  const knownPercentage = (knownCount / totalCards) * 100;
  const learningPercentage = (learningCount / totalCards) * 100;
  const notStudiedPercentage = (notStudiedCount / totalCards) * 100;

  return (
    <div className="w-full">
      <div className="h-2 w-full overflow-hidden rounded-full">
        {knownPercentage > 0 && (
          <div
            className="float-left h-full bg-link"
            style={{ width: `${knownPercentage}%` }}
          />
        )}

        {learningPercentage > 0 && (
          <div
            className="float-left h-full bg-link/50"
            style={{ width: `${learningPercentage}%` }}
          />
        )}

        {notStudiedPercentage > 0 && (
          <div
            className="float-left h-full bg-link/20"
            style={{ width: `${notStudiedPercentage}%` }}
          />
        )}
      </div>

      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-link" />
          <span>Known ({knownCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-link/50" />
          <span>Learning ({learningCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-link/20" />
          <span>Not studied ({notStudiedCount})</span>
        </div>
      </div>
    </div>
  );
}
