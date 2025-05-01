import React from "react";
import { Button } from "./button";
import { RefreshCcw } from "lucide-react";

const ResetButton = () => {
  return (
    <Button className="grow">
      <span>Reset</span>
      <span>
        <RefreshCcw />
      </span>
    </Button>
  );
};

export default ResetButton;
