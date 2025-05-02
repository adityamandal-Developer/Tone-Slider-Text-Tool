import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "./button";
import { Copy } from "lucide-react";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const CopyButton = forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button {...props} ref={ref} className="grow">
        <span>Copy</span>
        <span>
          <Copy />
        </span>
      </Button>
    );
  }
);

export default CopyButton;
