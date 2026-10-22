
import { LoaderCircle } from "lucide-react";

const LoadingState = ({
  message = "Loading...",
  fullPage = false,
}) => {
  return (
    <div
      className={`loading-state ${fullPage ? "loading-full-page" : ""}`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle className="loading-spinner" size={36} />
      <p>{message}</p>
    </div>
  );
};

export default LoadingState;
