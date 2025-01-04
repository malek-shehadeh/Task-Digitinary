// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-white text-xl font-bold">Task App</h1>
//         <div className="space-x-4 relative">
//           {/* Task Manager with Dropdown */}
//           <div className="inline-block">
//             <button
//               onClick={toggleDropdown}
//               className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Task Manager
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute bg-gray-700 rounded-md shadow-lg mt-2 py-2 w-48">
//                 <Link
//                   to="/task-manager"
//                   className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   Task Manager
//                 </Link>

//                 <Link
//                   to="/favorites/redux"
//                   className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600"
//                 >
//                   Redux Provider
//                 </Link>
//                 <Link
//                   to="/favorites/context"
//                   className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600"
//                 >
//                   Context Favorites
//                 </Link>
//               </div>
//             )}
//           </div>
//           {/* Other Links */}
//           <Link
//             to="/form"
//             className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//           >
//             Form
//           </Link>
//           <Link
//             to="/appchat"
//             className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//           >
//             App-Chat
//           </Link>
//           <Link
//             to="/ecommerce-manager"
//             className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//           >
//             Ecommerce
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
/////////////////
// src/Components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Reducers/authSlice";
import { Menu, X } from "lucide-react"; // Import icons

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
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
        {/* Desktop and Mobile Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Task App</h1>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Task Manager Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Task Manager
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 bg-gray-700 rounded-md shadow-lg mt-2 py-2 w-48">
                  <Link
                    to="/task-manager"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600"
                  >
                    Task Manager
                  </Link>
                  <Link
                    to="/favorites/redux"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600"
                  >
                    Redux Provider
                  </Link>
                  <Link
                    to="/favorites/context"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600"
                  >
                    Context Favorites
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/form"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Form
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

            {/* Auth Section */}
            <div className="flex items-center space-x-4 ml-4 border-l border-gray-600 pl-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-300 text-sm hidden lg:inline">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
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
              to="/form"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Form
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

            {/* Mobile Auth Section */}
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
