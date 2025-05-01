"use client";
import React, { useRef, useState, useEffect } from "react";
import ResetButton from "../ui/reset-button";
import CopyButton from "../ui/copy-button";
import UndoButton from "../ui/undo-button";
import RedoButton from "../ui/redo-button";
import { Dot } from "lucide-react";

const Settings = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragHistory, setDragHistory] = useState<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const dotRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();

    let newX = e.clientX - rect.left;
    let newY = e.clientY - rect.top;

    // Ensure dot stays within slider boundaries
    newX = Math.max(0, Math.min(newX, rect.width));
    newY = Math.max(0, Math.min(newY, rect.height));

    // Update position
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const newHistory = [
        ...dragHistory.slice(0, historyIndex + 1),
        { ...position },
      ];
      setDragHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleReset = () => {
    const newPosition = { x: 0, y: 0 };
    setPosition(newPosition);

    const newHistory = [...dragHistory.slice(0, historyIndex + 1), newPosition];
    setDragHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleCopy = () => {
    const coordinates = `x: ${Math.round(position.x)}, y: ${Math.round(
      position.y
    )}`;
    navigator.clipboard
      .writeText(coordinates)
      .then(() => console.log("Coordinates copied to clipboard"))
      .catch((err) => console.error("Failed to copy coordinates", err));
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setPosition(dragHistory[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < dragHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setPosition(dragHistory[newIndex]);
    }
  };

  return (
    <div className="w-full h-full lg:w-1/3 p-2 flex flex-col gap-1">
      {/* slider */}
      <div
        ref={sliderRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        id="slider"
        className="grow min-h-72 border rounded-md border-ring relative"
      >
        <div
          ref={dotRef}
          className="absolute cursor-move"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseDown={handleMouseDown}
        >
          <Dot className="w-20 h-20 text-primary" />
        </div>
        <div className="grid grid-cols-2 min-h-72">
          <div className="flex items-center justify-center w-full border border-ring text-center">
            Creative
          </div>
          <div className="flex items-center justify-center w-full border border-ring text-center">
            Professional
          </div>
          <div className="flex items-center justify-center w-full border border-ring text-center">
            Formal
          </div>
          <div className="flex items-center justify-center w-full border border-ring text-center">
            Casual
          </div>
        </div>
      </div>

      {/* Current coordinates */}
      <div className="text-sm text-gray-600 text-center">
        x: {Math.round(position.x)}, y: {Math.round(position.y)}
      </div>

      {/* undo redo */}
      <div className="flex gap-1 w-full" id="undo-redo">
        <UndoButton />
        <RedoButton />
      </div>

      {/* reset and copy */}
      <div className="flex gap-1" id="reset-copy">
        <ResetButton />
        <CopyButton />
      </div>
    </div>
  );
};

export default Settings;
