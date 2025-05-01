import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TextArea = () => {
  return (
    <div className="flex flex-col w-full lg:w-1/2 h-full gap-1.5 p-2 border-1 border-ring mt-2">
      <Label htmlFor="message">Your text</Label>
      <Textarea
        placeholder="Type your message here."
        id="message"
        className="grow"
      />
    </div>
  );
};

export default TextArea;
