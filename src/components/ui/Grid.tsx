import React from "react";

interface GridProps {
  columns?: number;
  gap?: "none" | "sm" | "md" | "lg";
  children?: React.ReactNode;
}

const gapMap: Record<string, string> = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-8",
};

const Grid = ({
  columns = 2,
  gap = "md",
  children,
}: GridProps) => {
  const cols = Math.min(Math.max(columns, 1), 6);
  const gridColsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  return (
    <div className={`grid ${gridColsMap[cols]} ${gapMap[gap] || "gap-4"}`}>
      {children}
    </div>
  );
};

export default Grid;
