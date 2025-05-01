import { Undo } from "lucide-react";
import React from "react";
import { Button } from "./button";

const UndoButton = () => {
  return (
    <Button className="grow">
      <span>Undo</span>
      <span>
        <Undo />
      </span>
    </Button>
  );
};

export default UndoButton;
