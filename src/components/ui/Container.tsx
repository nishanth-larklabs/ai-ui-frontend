import React from "react";

interface ContainerProps {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  children?: React.ReactNode;
}

const maxWidthMap: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-2xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

const paddingMap: Record<string, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-6",
  lg: "p-10",
};

const Container = ({
  maxWidth = "lg",
  padding = "md",
  children,
}: ContainerProps) => {
  return (
    <div
      className={`mx-auto w-full ${maxWidthMap[maxWidth] || "max-w-5xl"} ${paddingMap[padding] || "p-6"}`}
    >
      {children}
    </div>
  );
};

export default Container;
