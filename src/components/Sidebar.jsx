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
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 fixed">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <Link
        to="/admin"
        className="flex items-center gap-3 py-2 px-4 hover:bg-yellow-500 rounded"
      >
        <FaTachometerAlt /> Dashboard
      </Link>
      <Link
        to="/admin/orders"
        className="flex items-center gap-3 py-2 px-4 hover:bg-yellow-500 rounded"
      >
        <FaShoppingCart /> Orders
      </Link>
      <Link
        to="/admin/products"
        className="flex items-center gap-3 py-2 px-4 hover:bg-yellow-500 rounded"
      >
        <FaBox /> Products
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded flex items-center justify-center"
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
