// import React from "react";

// export const FormField = ({
//   as: Component = "input",
//   label,
//   value,
//   onChange,
//   error,
//   helperText,
//   type = "text",
//   required = false,
//   placeholder,
//   ...props
// }) => {
//   const isValid = value && !error;

//   return (
//     <div className="mb-4">
//       {label && (
//         <label className="block text-sm font-medium mb-1">
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}
//       <div className="relative">
//         <Component
//           {...props}
//           type={type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
//             ${
//               error
//                 ? "border-red-500"
//                 : isValid
//                 ? "border-green-500"
//                 : "border-gray-300"
//             }
//             transition-colors`}
//         />
//         {isValid && (
//           <svg
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path d="M5 13l4 4L19 7" />
//           </svg>
//         )}
//         {error && (
//           <svg
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         )}
//       </div>
//       {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
//       {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//     </div>
//   );
// };
////
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const FormField = ({
  as: Component = "input",
  label,
  value,
  onChange,
  error,
  helperText,
  type = "text",
  required = false,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isValid = value && !error;
  const isPassword = type === "password";

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {/* Password Toggle Button - Now on the left */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex="-1"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}

        <Component
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            [&::-ms-reveal]:hidden [&::-ms-clear]:hidden
            ${
              error
                ? "border-red-500"
                : isValid
                ? "border-green-500"
                : "border-gray-300"
            }
            transition-colors
            ${isPassword ? "pl-12 pr-10" : "px-3"}`}
        />

        {/* Validation Icons - Always on the right */}
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
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
