import React from "react";

interface ButtonProps {
  label: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, variant = "outline", onClick }) => {
  const base = "px-4 py-2 rounded font-semibold transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "border border-gray-700 text-gray-700 hover:bg-gray-200";

  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
