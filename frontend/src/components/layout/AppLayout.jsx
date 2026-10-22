
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";

const AppLayout = () => {
  return (
    <div className="app-layout">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main application area */}
      <div className="app-main">
        <Header />

        <main className="app-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
};

export default AppLayout;
