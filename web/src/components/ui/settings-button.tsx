import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "./button";
import { Copy } from "lucide-react";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: React.ReactNode;
}
const SettingsButton = forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button {...props} ref={ref} className="grow">
        <span>{props.label}</span>
        <span>{props.icon}</span>
      </Button>
    );
  }
);
SettingsButton.displayName = "SettingsButton";
export default SettingsButton;
