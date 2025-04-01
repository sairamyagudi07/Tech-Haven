import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { userRole, cartItems, setUserRole } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold flex-shrink-0">
            Tech Haven
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-2xl">{isMenuOpen ? "×" : "☰"}</span>
          </button>

          {/* Center Links & Search - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            <Link to="/" className="hover:text-gray-400 text-sm lg:text-base">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-400 text-sm lg:text-base">
              Products
            </Link>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 rounded text-sm bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 w-32 lg:w-48"
            />
          </div>

          {/* Right Side - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {userRole === "user" && isLoggedIn ? (
              <>
                <Link to="/UserDashboard" className="hover:text-gray-400 text-sm lg:text-base">
                  My Orders
                </Link>
                <Link to="/cart" className="relative">
                  <FaShoppingCart size={20} className="lg:size-8" />
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu - Shown when open */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 rounded text-sm bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {userRole === "user" && isLoggedIn ? (
              <div className="space-y-3">
                <Link to="/UserDashboard" className="block hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>
                  My Orders
                </Link>
                <Link to="/cart" className="relative flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <FaShoppingCart size={20} />
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-2 left-5 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                  <span className="ml-7">Cart</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
