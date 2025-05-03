"use client";

import { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  editor: Editor;
  type: "color" | "highlight";
  title: string;
}

const TEXT_COLORS = [
  { value: "#000000", label: "Black" },
  { value: "#434343", label: "Dark Gray" },
  { value: "#666666", label: "Gray" },
  { value: "#999999", label: "Light Gray" },
  { value: "#ffffff", label: "White" },
  { value: "#ff0000", label: "Red" },
  { value: "#ff8c00", label: "Orange" },
  { value: "#ffff00", label: "Yellow" },
  { value: "#008000", label: "Green" },
  { value: "#0000ff", label: "Blue" },
  { value: "#4b0082", label: "Indigo" },
  { value: "#800080", label: "Purple" },
  { value: "#a52a2a", label: "Brown" },
];

const HIGHLIGHT_COLORS = [
  { value: "#ffff00", label: "Yellow" },
  { value: "#ff99cc", label: "Pink" },
  { value: "#ff9966", label: "Peach" },
  { value: "#00ff00", label: "Lime" },
  { value: "#00ffff", label: "Aqua" },
  { value: "#66ccff", label: "Light Blue" },
  { value: "#ccccff", label: "Lavender" },
];

export default function ColorPicker({ editor, type, title }: ColorPickerProps) {
  const isTextColor = type === "color";
  const colors = isTextColor ? TEXT_COLORS : HIGHLIGHT_COLORS;

  const getCurrentColor = () => {
    if (isTextColor) {
      // Try to get current text color
      return editor.getAttributes("textStyle").color;
    } else {
      // Try to get current highlight color
      return editor.getAttributes("highlight").color;
    }
  };

  const setColor = (color: string) => {
    if (isTextColor) {
      editor.chain().focus().setColor(color).run();
    } else {
      editor.chain().focus().toggleHighlight({ color }).run();
    }
  };

  const removeColor = () => {
    if (isTextColor) {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().unsetHighlight().run();
    }
  };

  const currentColor = getCurrentColor();

  return (
    <div className="p-2">
      <div className="mb-2">
        <Label>{title}</Label>
        <div className="flex items-center mt-1 gap-2">
          <div
            className="w-6 h-6 border rounded"
            style={{ backgroundColor: currentColor || "transparent" }}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={removeColor}
            className="text-xs h-7"
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-2">
        {colors.map((color) => (
          <button
            key={color.value}
            className={cn(
              "w-8 h-8 rounded border border-gray-200 transition-all",
              currentColor === color.value &&
                "ring-2 ring-primary ring-offset-2"
            )}
            style={{ backgroundColor: color.value }}
            onClick={() => setColor(color.value)}
            title={color.label}
            aria-label={`Set color to ${color.label}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
