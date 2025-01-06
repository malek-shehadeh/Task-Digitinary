import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl w-full text-center">
        +{" "}
        <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-8 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 transition-all duration-500 ease-in-out transform hover:scale-105">
            Welcome to
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-blue-600 transition-all duration-500 ease-in-out transform hover:scale-105">
            My Website{" "}
          </h2>
        </div>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Manage your tasks and explore our products with ease
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/ecommerce-manager"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 
                     rounded-lg hover:bg-blue-50 transition-all duration-300 
                     transform hover:-translate-y-1 hover:shadow-lg"
          >
            E-commerce
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
