import React from "react";
import { Button } from "../ui/button";

const Settings = () => {
  return (
    <div className="w-full h-full lg:w-1/3 p-2 flex flex-col gap-1">
      {/* slider */}
      <div className="grow min-h-72 border-1 border-ring" id="slider">
        Slider
      </div>

      {/* undo redo */}
      <div className="flex gap-1 w-full" id="undo-redo">
        <Button className="grow" variant={"outline"}>
          undo
        </Button>
        <Button className="grow" variant={"outline"}>
          redo
        </Button>
      </div>

      {/* reset and copy */}
      <div className="flex gap-1 " id="reset-copy">
        <Button className="grow" variant={"outline"}>
          reset
        </Button>
        <Button className="grow" variant={"outline"}>
          copy
        </Button>
      </div>
    </div>
  );
};

export default Settings;
