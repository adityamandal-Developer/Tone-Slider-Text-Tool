import React from "react";
import { Button } from "./button";
import { Redo } from "lucide-react";

const RedoButton = () => {
  return (
    <Button className="grow">
      <span>Redo</span>
      <span>
        <Redo />
      </span>
    </Button>
  );
};

export default RedoButton;
