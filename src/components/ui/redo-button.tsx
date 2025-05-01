import React from "react";
import { Button } from "./button";
import { Redo } from "lucide-react";

type Props = {};

const RedoButton = (props: Props) => {
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
