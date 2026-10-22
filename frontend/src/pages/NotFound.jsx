
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import Button from "../components/common/Button";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-icon">
        <AlertCircle size={48} />
      </div>

      <h1>404</h1>
      <h2>Page Not Found</h2>

      <p>
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">
          <Home size={18} /> Back to Dashboard
        </Link>

        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
