
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Bell,
  UserRound,
  Menu,
} from "lucide-react";

const mobileNavigation = [
  {
    name: "Home",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Timetable",
    path: "/timetable",
    icon: CalendarDays,
  },
  {
    name: "Academics",
    path: "/academics",
    icon: BookOpen,
  },
  {
    name: "Alerts",
    path: "/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: UserRound,
  },
];

const MobileNav = () => {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {mobileNavigation.map(({ name, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/"}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <Icon size={21} strokeWidth={1.8} />
          <span>{name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileNav;
