import React, { InputHTMLAttributes } from "react";

interface Params extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Checkbox = ({ id, label, ...props }: Params) => {
  return (
    <div className="flex justify-center items-center">
      <input
        id={id}
        type="checkbox"
        className="w-4 h-4 border border-red-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
        {...props}
      />
      <label htmlFor={id} className="ml-2">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
