import React from "react";

export const Checkbox = ({ label, checked, onChange, error, ...props }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-blue-500 border-gray-300 rounded 
                     focus:ring-blue-500"
          {...props}
        />
        {label && (
          <label className="ml-2 block text-sm text-gray-700">{label}</label>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
