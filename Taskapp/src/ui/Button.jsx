import React from "react";

export const Button = ({
  onClick,
  children,
  type = "button",
  variant = "default",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";
  const variants = {
    default: `bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed`,
    danger: `bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed`,
    success: `bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed`,
    outline: `border border-gray-300 text-gray-800 hover:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`,
    primary: `bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`,
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${selectedVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
