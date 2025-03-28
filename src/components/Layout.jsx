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
    <div className="flex">
      {isAdmin && !hideNavbar && <Sidebar />}

      <div className={isAdmin && !hideNavbar ? "flex-1 pl-64" : "flex-1"}>
        {!hideNavbar && !isAdmin && <Navbar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
