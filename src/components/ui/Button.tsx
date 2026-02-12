import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  onClick?: () => void;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
  secondary:
    "bg-gray-600 text-white hover:bg-gray-700 shadow-sm",
  danger:
    "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white",
  ghost:
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-lg",
};

const Button = ({
  variant = "primary",
  size = "md",
  children = "Button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4A27F]/40 focus:ring-offset-2 cursor-pointer ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md}`}
    >
      {children}
    </button>
  );
};

export default Button;
