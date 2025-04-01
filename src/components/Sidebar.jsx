import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  FaUserCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaShoppingCart,
  FaBox,
} from "react-icons/fa";

const Sidebar = () => {
  const { setUserRole } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    navigate("/");
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white flex flex-col p-4 sm:p-6 transform transition-transform duration-300 md:translate-x-0 md:static md:h-screen z-50">
      {/* Header */}
      <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 flex-shrink-0">
        Admin Panel
      </h2>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        <Link
          to="/admin"
          className="flex items-center gap-3 py-2 px-4 text-sm sm:text-base hover:bg-yellow-500 rounded transition-colors duration-200"
        >
          <FaTachometerAlt className="text-lg sm:text-xl" /> Dashboard
        </Link>
        <Link
          to="/admin/orders"
          className="flex items-center gap-3 py-2 px-4 text-sm sm:text-base hover:bg-yellow-500 rounded transition-colors duration-200"
        >
          <FaShoppingCart className="text-lg sm:text-xl" /> Orders
        </Link>
        <Link
          to="/admin/products"
          className="flex items-center gap-3 py-2 px-4 text-sm sm:text-base hover:bg-yellow-500 rounded transition-colors duration-200"
        >
          <FaBox className="text-lg sm:text-xl" /> Products
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded flex items-center justify-center text-sm sm:text-base transition-colors duration-200"
      >
        <FaSignOutAlt className="mr-2 text-lg sm:text-xl" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
