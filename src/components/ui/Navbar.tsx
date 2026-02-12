interface NavbarProps {
  title?: string;
  variant?: "default" | "dark";
}

const Navbar = ({
  title = "App",
  variant = "default",
}: NavbarProps) => {
  const baseClasses =
    "w-full px-6 py-4 flex items-center justify-between border-b";
  const variantClasses =
    variant === "dark"
      ? "bg-gray-900 text-white border-gray-700"
      : "bg-white text-gray-900 border-gray-200";

  return (
    <nav className={`${baseClasses} ${variantClasses}`}>
      <span className="text-xl font-bold tracking-tight">{title}</span>
    </nav>
  );
};

export default Navbar;
