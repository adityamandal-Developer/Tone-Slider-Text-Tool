import React from "react";
import Logo from "../ui/logo";
import ChangeThemeButton from "../ui/change-theme-button";

const Header = () => {
  return (
    <header className="flex justify-between items-center border-1 border-ring p-2">
      <Logo />
      <ChangeThemeButton />
    </header>
  );
};

export default Header;
