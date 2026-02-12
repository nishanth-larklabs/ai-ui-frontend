interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  label?: string;
  value?: string;
}

const Input = ({
  type = "text",
  placeholder = "",
  label,
  value,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4A27F]/30 focus:border-[#D4A27F] transition-colors bg-white"
      />
    </div>
  );
};

export default Input;
