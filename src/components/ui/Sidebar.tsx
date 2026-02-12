interface SidebarItem {
  label: string;
  icon?: string;
}

interface SidebarProps {
  items?: SidebarItem[];
  variant?: "default" | "compact";
}

const Sidebar = ({
  items = [],
  variant = "default",
}: SidebarProps) => {
  const widthClass = variant === "compact" ? "w-16" : "w-60";

  return (
    <aside
      className={`${widthClass} min-h-full bg-gray-50 border-r border-gray-200 py-4 flex flex-col gap-1`}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md mx-2 transition-colors"
        >
          {variant === "compact" ? (
            <span className="text-center block">
              {item.icon || item.label.charAt(0)}
            </span>
          ) : (
            <span>
              {item.icon ? `${item.icon} ` : ""}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
