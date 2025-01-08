import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAndClearCart } from "../Reducers/authSlice";
import { Menu, X, ShoppingCart } from "lucide-react";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutAndClearCart());
    navigate("/ecommerce-manager/login");
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/ecommerce-manager/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/task-manager"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Task Manager
                </Link>
                <Link
                  to="/appchat"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  App-Chat
                </Link>
                <Link
                  to="/ecommerce-manager"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Ecommerce
                </Link>
              </>
            ) : (
              <Link
                to="/ecommerce-manager"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Ecommerce
              </Link>
            )}

            <Link
              to="/form"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Form
            </Link>

            {isAuthenticated && (
              <Link
                to="/ecommerce-manager/cart"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative"
              >
                <ShoppingCart size={20} className="inline-block" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            )}

            <div className="flex items-center space-x-4 ml-4 border-l border-gray-600 pl-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-300 text-sm hidden lg:inline">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/task-manager"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Task Manager
                </Link>
                <Link
                  to="/favorites/redux"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Redux Favorites
                </Link>
                <Link
                  to="/favorites/context"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Context Favorites
                </Link>

                <Link
                  to="/appchat"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  App-Chat
                </Link>
                <Link
                  to="/ecommerce-manager"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ecommerce
                </Link>
                <Link
                  to="/ecommerce-manager/cart"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart size={20} className="inline-block mr-2" />
                  Cart
                  {totalQuantity > 0 && (
                    <span className="ml-2 bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/ecommerce-manager"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ecommerce
                </Link>
              </>
            )}

            <Link
              to="/form"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Form
            </Link>

            <div className="border-t border-gray-700 mt-4 pt-4">
              {isAuthenticated ? (
                <>
                  <span className="block text-gray-300 px-3 py-2 text-base font-medium">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-400 hover:text-red-300 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full text-left text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
