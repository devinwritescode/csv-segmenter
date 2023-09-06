import React from "react";
import { FaTools } from "react-icons/fa";

const Logo: React.FC = () => {
  return (
    <div className="mr-auto flex items-center">
      <FaTools className="w-4 h-4 mr-3 text-slate-400" />
      <span className="self-center text-xl font-semibold whitespace-nowrap text-slate-400">
        Revenx Tools
      </span>
    </div>
  );
};

export default Logo;
