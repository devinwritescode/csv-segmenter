import React from "react";
import Logo from "../uiItems/navbar/Logo";

const Header: React.FC = () => {
  return (
    <div className="fixed flex items-center justify-between top-0 z-50 w-full px-4 py-3 lg:px-5 lg:pl-5x">
      <Logo />
    </div>
  );
};

export default Header;
