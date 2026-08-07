interface GoalTrackerProps {
  current: number;
  max: number;
  label?: string;
  icon?: React.ReactNode;
  primaryColor?: string;
  secondaryColor?: string;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({
  current,
  max,
  label = "Yearly Goal",
  icon,
  primaryColor = "bg-[#b99ef6]",
  secondaryColor = "bg-white/20",
}) => {
  const safeMax = Math.max(max, 0);
  const safeCurrent = Math.max(0, Math.min(current, safeMax));

  const percentage =
    safeMax > 0 ? Math.min((safeCurrent / safeMax) * 100, 100) : 0;

  const goalAchieved = safeMax > 0 && safeCurrent >= safeMax;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          {icon && (
            <span className="shrink-0 text-[#b99ef6]">
              {icon}
            </span>
          )}

          <span className="truncate font-semibold">
            {label}
          </span>
        </div>

        <span className="shrink-0 text-sm font-semibold text-[#b99ef6]">
          {safeCurrent}/{safeMax}
        </span>
      </div>

      <div
        className={`h-3 w-full overflow-hidden rounded-full ${secondaryColor}`}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={safeCurrent}
      >
        <div
          className={`h-full rounded-full ${primaryColor} transition-[width] duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-4">
        <span className="text-xs text-zinc-400 font-medium">
          {goalAchieved
            ? "You achieved your goal :D"
            : `${Math.round(percentage)}% completed`}
        </span>

        {!goalAchieved && safeMax > 0 && (
          <span className="text-xs text-zinc-400 font-medium0">
            {safeMax - safeCurrent} remaining
          </span>
        )}
      </div>
    </div>
  );
};

export default GoalTracker;