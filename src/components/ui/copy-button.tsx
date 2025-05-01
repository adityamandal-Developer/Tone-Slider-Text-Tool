import React from "react";
import { Button } from "./button";
import { Copy } from "lucide-react";

const CopyButton = () => {
  return (
    <Button className="grow">
      <span>Copy</span>
      <span>
        <Copy />
      </span>
    </Button>
  );
};

export default CopyButton;
