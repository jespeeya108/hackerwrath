
import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="icon-button menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <form className="header-search" onSubmit={handleSearch}>
          <Search size={19} />

          <input
            type="search"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search"
          />

          <kbd>⌘ K</kbd>
        </form>
      </div>

      <div className="header-right">
        <button
          className="icon-button notification-button"
          onClick={() => navigate("/notifications")}
          aria-label="View notifications"
        >
          <Bell size={21} />
          <span className="header-notification-dot" />
        </button>

        <div className="header-divider" />

        <div className="header-profile">
          <button
            className="profile-trigger"
            onClick={() => setShowProfileMenu((previous) => !previous)}
            aria-expanded={showProfileMenu}
            aria-label="Open profile menu"
          >
            <div className="profile-avatar">ST</div>

            <div className="profile-info">
              <span className="profile-name">Student Name</span>
              <span className="profile-role">Student</span>
            </div>

            <ChevronDown size={16} />
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate("/profile");
                }}
              >
                <UserRound size={17} />
                My Profile
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate("/profile");
                }}
              >
                <Settings size={17} />
                Settings
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate("/login");
                }}
              >
                <LogOut size={17} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
