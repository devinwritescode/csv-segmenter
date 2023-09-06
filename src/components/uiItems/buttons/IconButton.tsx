import React from "react";

// Define a type for the props
interface IconButtonProps {
  onClick: () => void;
  Icon: React.FC<{ className?: string }>;
  className?: string;
}

// Define the component
const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  Icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded outline outline-1 outline-slate-200 p-[0.15rem] text-slate-200 opacity-50 hover:opacity-100 focus:opacity-100 transition-ease-in-out transition-all transition-duration: 225ms ${className}`}
    >
      <Icon className="fill-inherit w-3 h-3" />
    </button>
  );
};

// Export the component
export default IconButton;
