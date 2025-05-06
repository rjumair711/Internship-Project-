import React from "react";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={`w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
