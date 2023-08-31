import React from "react";

interface IconButtonProps {
  onClick: () => void;
  Icon: React.FC<{ className?: string }>;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  Icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded outline outline-1 outline-slate-700 px-1 py-1 text-slate-400 hover:text-slate-200 hover:outline-slate-200 focus:text-slate-200 focus:outline-slate-200 transition-ease-in-out transition-all transition-duration: 225ms ${className}`}
    >
      <Icon className="fill-inherit w-5 h-5" />
    </button>
  );
};

export default IconButton;
