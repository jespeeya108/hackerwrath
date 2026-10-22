
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  BookOpen,
  FileText,
  CreditCard,
  Bell,
  UserRound,
  X,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Timetable", path: "/timetable", icon: CalendarDays },
  { name: "Examinations", path: "/examinations", icon: GraduationCap },
  { name: "Academics", path: "/academics", icon: BookOpen },
  { name: "Documents", path: "/documents", icon: FileText },
  { name: "Fees", path: "/fees", icon: CreditCard },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Profile", path: "/profile", icon: UserRound },
];

const Sidebar = ({ isOpen = false, onClose }) => {
  return (
    <>
      {isOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">
            <GraduationCap size={26} />
          </div>

          <div className="brand-text">
            <h2>CampusOne</h2>
            <span>STUDENT PORTAL</span>
          </div>

          <button
            className="sidebar-close"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section-label">MENU</div>

        <nav className="sidebar-nav">
          {navigation.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{name}</span>

              {name === "Notifications" && (
                <span className="notification-dot" />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-icon">
            <GraduationCap size={20} />
          </div>
          <div>
            <p>CampusOne</p>
            <span>Your academic companion</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
