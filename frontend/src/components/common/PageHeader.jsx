
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const PageHeader = ({
  title,
  description,
  breadcrumbs = [],
  actions,
}) => {
  return (
    <div className="page-header">
      <div className="page-header-content">
        {breadcrumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-home">
              <Home size={15} />
              <span>Home</span>
            </Link>

            {breadcrumbs.map((item, index) => (
              <span className="breadcrumb-item" key={`${item.label}-${index}`}>
                <ChevronRight size={15} />

                {item.path && index !== breadcrumbs.length - 1 ? (
                  <Link to={item.path}>{item.label}</Link>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="page-title">{title}</h1>

        {description && (
          <p className="page-description">{description}</p>
        )}
      </div>

      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
};

export default PageHeader;
