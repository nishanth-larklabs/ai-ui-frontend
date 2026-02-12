import React from "react";

interface StackProps {
  children: React.ReactNode;
  gap?: "none" | "sm" | "md" | "lg";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
}

const gapMap = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-8",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export const HStack = ({
  children,
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
}: StackProps) => {
  return (
    <div
      className={`flex flex-row ${gapMap[gap]} ${alignMap[align]} ${justifyMap[justify]} ${wrap ? "flex-wrap" : "flex-nowrap"} w-full`}
    >
      {children}
    </div>
  );
};

export const VStack = ({
  children,
  gap = "md",
  align = "stretch",
  justify = "start",
}: Omit<StackProps, "wrap">) => {
  return (
    <div
      className={`flex flex-col ${gapMap[gap]} ${alignMap[align]} ${justifyMap[justify]} w-full`}
    >
      {children}
    </div>
  );
};

export const Spacer = () => {
  return <div className="flex-grow min-w-4 min-h-4" />;
};
