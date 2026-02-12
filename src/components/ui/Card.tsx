import React from "react";

interface CardProps {
  title?: string;
  variant?: "default" | "bordered" | "elevated";
  children?: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  default: "bg-white border border-gray-200 rounded-xl",
  bordered: "bg-white border-2 border-gray-300 rounded-xl",
  elevated: "bg-white rounded-xl shadow-lg shadow-gray-200/50",
};

const Card = ({
  title,
  variant = "default",
  children,
}: CardProps) => {
  return (
    <div className={`${variantClasses[variant] || variantClasses.default} p-6`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default Card;
