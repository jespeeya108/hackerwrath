
import { Inbox, RefreshCw } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  title = "Nothing here yet",
  description = "There is no data to display right now.",
  icon: Icon = Inbox,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={36} strokeWidth={1.6} />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      {actionLabel && onAction && (
        <Button
          variant="primary"
          icon={RefreshCw}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
