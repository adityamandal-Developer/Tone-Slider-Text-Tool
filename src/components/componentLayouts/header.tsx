import React from "react";
import Logo from "../ui/logo";
import ChangeThemeButton from "../ui/change-theme-button";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between items-center border-1 border-ring p-2">
      <Logo />
      <ChangeThemeButton />
    </header>
  );
};

export default Header;
