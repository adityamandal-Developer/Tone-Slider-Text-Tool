import React from "react";
import Logo from "../ui/logo";
import ChangeThemeButton from "../ui/change-theme-button";

const Header = () => {
  return (
    <header className="flex justify-between items-center border rounded-md border-ring p-2 md:px-8">
      <Logo />
      <ChangeThemeButton />
    </header>
  );
};

export default Header;
