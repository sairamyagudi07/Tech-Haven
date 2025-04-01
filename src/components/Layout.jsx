import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { userRole } = useAppContext();
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth";
  const isAdmin = userRole === "admin";

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Sidebar - Hidden on mobile, fixed on desktop for admin */}
      {isAdmin && !hideNavbar && (
        <div className="w-full md:w-64 md:fixed md:h-screen md:top-0 md:left-0">
          <Sidebar />
        </div>
      )}

      {/* Main content area */}
      <div
        className={`flex-1 ${
          isAdmin && !hideNavbar
            ? "md:pl-64" // Padding only on md+ screens when sidebar is present
            : ""
        }`}
      >
        {/* Navbar - Full width on mobile, adjusted for desktop */}
        {!hideNavbar && !isAdmin && (
          <div className="w-full">
            <Navbar />
          </div>
        )}
        
        {/* Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
