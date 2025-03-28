import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon

const Navbar = () => {
  const { userRole, cartItems, setUserRole } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Check login status from localStorage on component mount
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Tech Haven
      </Link>

      {/* Center: Links & Search Bar */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-gray-400">
          Home
        </Link>
        <Link to="/products" className="hover:text-gray-400">
          Products
        </Link>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 rounded text-white bg-gray-700"
        />
      </div>

      <div className="flex items-center space-x-4">
        {userRole === "user" && isLoggedIn ? (
          <>
            <Link to="/UserDashboard" className="text-white">
              My Orders
            </Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart size={24} />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-yellow-500 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="bg-yellow-500 text-white px-4 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
