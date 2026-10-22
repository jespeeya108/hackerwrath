
import { LoaderCircle } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${
        fullWidth ? "btn-full-width" : ""
      } ${className}`.trim()}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="btn-spinner" size={18} />
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon size={18} />}
          <span>{children}</span>
          {Icon && iconPosition === "right" && <Icon size={18} />}
        </>
      )}
    </button>
  );
};

export default Button;
