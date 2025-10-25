import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary" }) => {
  const base =
    "font-semibold py-3 px-8 rounded transition-all duration-300 text-sm md:text-base";
  const styles =
    variant === "primary"
      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
      : "border border-black hover:bg-black hover:text-white";

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {label}
    </button>
  );
};

export default Button;
