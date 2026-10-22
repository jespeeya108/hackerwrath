
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  trend,
  trendLabel,
}) => {
  const isPositive = trend >= 0;

  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-top">
        <div className={`stat-card-icon stat-icon-${color}`}>
          {Icon && <Icon size={22} strokeWidth={1.8} />}
        </div>

        {trend !== undefined && trend !== null && (
          <span
            className={`stat-trend ${
              isPositive ? "trend-positive" : "trend-negative"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={15} />
            ) : (
              <ArrowDownRight size={15} />
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      <div className="stat-card-content">
        <p className="stat-card-title">{title}</p>
        <h3 className="stat-card-value">{value}</h3>

        {(subtitle || trendLabel) && (
          <p className="stat-card-subtitle">
            {trendLabel && (
              <span
                className={
                  isPositive ? "stat-subtitle-positive" : "stat-subtitle-muted"
                }
              >
                {trendLabel}
              </span>
            )}
            {subtitle && <span>{subtitle}</span>}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
