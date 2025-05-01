import React from "react";
import ResetButton from "../ui/reset-button";
import CopyButton from "../ui/copy-button";
import UndoButton from "../ui/undo-button";
import RedoButton from "../ui/redo-button";

const Settings = () => {
  return (
    <div className="w-full h-full lg:w-1/3 p-2 flex flex-col gap-1">
      {/* slider */}
      <div className="grow min-h-72 border-1 border-ring" id="slider">
        Slider
      </div>

      {/* undo redo */}
      <div className="flex gap-1 w-full" id="undo-redo">
        <UndoButton />
        <RedoButton />
      </div>

      {/* reset and copy */}
      <div className="flex gap-1 " id="reset-copy">
        <ResetButton />
        <CopyButton />
      </div>
    </div>
  );
};

export default Settings;
