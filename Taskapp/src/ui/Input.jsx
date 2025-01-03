import React from "react";

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  name,
  helperText,
  className = "",
  ...props
}) => {
  const isValid = value && !error;

  return (
    <div className={`mb-4 ${className}`}>
      {/* Label Section */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3 py-2 rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
            ${
              error
                ? "border-red-500 pr-10"
                : isValid
                ? "border-green-500 pr-10"
                : "border-gray-300"
            }`}
          {...props}
        />

        {/* Success Icon */}
        {isValid && (
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}

        {/* Error Icon */}
        {error && (
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>

      {/* Helper Text */}
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
