import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  text: string;
  Icon?: React.FC<{ className: string }> | React.ComponentType;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, text, Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center m-auto gap-2 px-4 py-2 rounded outline outline-1 outline-slate-700 font-normal hover:bg-blue-800 hover:outline-blue-800 hover:shadow-lg focus:outline-blue-800 focus:bg-blue-800 focus:text-slate-100 focus:shadow-lg transition-ease-in-out transition-all transition-duration: 225ms ${className}`}
    >
      {text}
      {Icon && <Icon className="w-5" />}
    </button>
  );
};

export default Button;
