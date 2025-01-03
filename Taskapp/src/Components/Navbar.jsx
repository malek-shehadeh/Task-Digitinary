import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Task App</h1>
        <div className="space-x-4 relative">
          {/* Task Manager with Dropdown */}
          <div className="inline-block">
            <button
              onClick={toggleDropdown}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Task Manager
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-gray-700 rounded-md shadow-lg mt-2 py-2 w-48">
                <Link
                  to="/task-manager"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
          {/* Other Links */}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
