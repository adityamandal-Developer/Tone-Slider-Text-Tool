// components/MyButton.tsx
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "./button";
import { RefreshCcw } from "lucide-react";

// Define props, extending HTML button attributes
interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

// Use forwardRef to pass ref to the underlying button element
const ResetButton = forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button {...props} ref={ref} className="grow">
        <span>Reset</span>
        <span>
          <RefreshCcw />
        </span>
      </Button>
    );
  }
);

export default ResetButton;
