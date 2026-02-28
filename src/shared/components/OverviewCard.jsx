

const OverviewCard = ({ title, value, change }) => {
  const hasChange = change != null;
  const isPositive = hasChange && change > 0;
  const isNegative = hasChange && change < 0;

  return (
    <div className="relative overflow-hidden bg-linear-to-b from neutral-900 to-neutral-950 border border-neutral-800 rounded-e-2xl p-6 hover:shadow-lg hover:shadow-black/20 transition-all group">
      <div className="absolute inset-0 bg-linear-to-r from -indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-wider text-neutral-500 mb-4 font-medium">
          {title}
        </p>
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            {value ?? "-"}
          </h2>

          {hasChange ? (
            <span
              className={`text-sm font-medium ${
                isPositive
                  ? "text-emerald-400"
                  : isNegative
                    ? "text-rose-400"
                    : "text-neutral-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
          ) : (
            <span className="text-sm font-medium text-neutral-500">-</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;

