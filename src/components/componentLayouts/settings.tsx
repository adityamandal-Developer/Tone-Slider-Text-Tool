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
  const [tonePercentages, setTonePercentages] = useState({
    professional: 25,
    creative: 25,
    formal: 25,
    casual: 25,
  });

  const dotRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate tone percentages based on position
  const calculateTonePercentages = (x: number, y: number) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();

    // Normalize position to values between 0 and 1
    const normalizedX = x / rect.width;
    const normalizedY = y / rect.height;

    const professionalPos = { x: 0.5, y: 0 }; // top center
    const creativePos = { x: 1, y: 0.5 }; // right middle
    const formalPos = { x: 0, y: 0.5 }; // left middle
    const casualPos = { x: 0.5, y: 1 }; // bottom center

    const professionalDist =
      1 /
      (Math.pow(normalizedX - professionalPos.x, 2) +
        Math.pow(normalizedY - professionalPos.y, 2) +
        0.01);
    const creativeDist =
      1 /
      (Math.pow(normalizedX - creativePos.x, 2) +
        Math.pow(normalizedY - creativePos.y, 2) +
        0.01);
    const formalDist =
      1 /
      (Math.pow(normalizedX - formalPos.x, 2) +
        Math.pow(normalizedY - formalPos.y, 2) +
        0.01);
    const casualDist =
      1 /
      (Math.pow(normalizedX - casualPos.x, 2) +
        Math.pow(normalizedY - casualPos.y, 2) +
        0.01);

    // Sum of all weights
    const totalDist = professionalDist + creativeDist + formalDist + casualDist;

    // Calculate percentages (0-100)
    const professional = Math.round((professionalDist / totalDist) * 100);
    const creative = Math.round((creativeDist / totalDist) * 100);
    const formal = Math.round((formalDist / totalDist) * 100);
    const casual = Math.round((casualDist / totalDist) * 100);

    // Ensure total is exactly 100%
    const total = professional + creative + formal + casual;
    let adjustment = 100 - total;

    // Adjust values to sum is 100%
    let adjustedValues = {
      professional,
      creative,
      formal,
      casual,
    };

    // Apply adjustment to the largest value
    const max = Math.max(professional, creative, formal, casual);
    if (max === professional) adjustedValues.professional += adjustment;
    else if (max === creative) adjustedValues.creative += adjustment;
    else if (max === formal) adjustedValues.formal += adjustment;
    else adjustedValues.casual += adjustment;

    return adjustedValues;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();

    let newX = e.clientX - rect.left;
    let newY = e.clientY - rect.top;

    //dot stays within slider boundaries
    newX = Math.max(0, Math.min(newX, rect.width));
    newY = Math.max(0, Math.min(newY, rect.height));

    // Update position
    setPosition({ x: newX, y: newY });

    // Calculate and update tone percentages
    const percentages = calculateTonePercentages(newX, newY);
    if (percentages) {
      setTonePercentages(percentages);
    }
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

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
    setIsDragging(true);

    // Move dot to initial touch position
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const rect = slider.getBoundingClientRect();
      const touch = e.touches[0];

      let newX = touch.clientX - rect.left;
      let newY = touch.clientY - rect.top;

      // Ensure within boundaries
      newX = Math.max(0, Math.min(newX, rect.width));
      newY = Math.max(0, Math.min(newY, rect.height));

      setPosition({ x: newX, y: newY });

      // Calculate and update tone percentages
      const percentages = calculateTonePercentages(newX, newY);
      if (percentages) {
        setTonePercentages(percentages);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const touch = e.touches[0];

    let newX = touch.clientX - rect.left;
    let newY = touch.clientY - rect.top;

    // Ensure dot stays within slider boundaries
    newX = Math.max(0, Math.min(newX, rect.width));
    newY = Math.max(0, Math.min(newY, rect.height));

    // Update position
    setPosition({ x: newX, y: newY });

    // Calculate and update tone percentages
    const percentages = calculateTonePercentages(newX, newY);
    if (percentages) {
      setTonePercentages(percentages);
    }
  };

  const handleTouchEnd = () => {
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

  // Global event handlers for capturing mouse/touch outside
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalTouchEnd);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [isDragging]);

  // Initialize tone percentages on component mount
  useEffect(() => {
    if (sliderRef.current) {
      const percentages = calculateTonePercentages(position.x, position.y);
      if (percentages) {
        setTonePercentages(percentages);
      }
    }
  }, []);

  // Handle buttons
  const handleReset = () => {
    const newPosition = { x: 0, y: 0 };
    setPosition(newPosition);

    const newHistory = [...dragHistory.slice(0, historyIndex + 1), newPosition];
    setDragHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Reset tone percentages
    const percentages = calculateTonePercentages(0, 0);
    if (percentages) {
      setTonePercentages(percentages);
    }
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
      const newPosition = dragHistory[newIndex];
      setPosition(newPosition);

      // Update tone percentages for the new position
      const percentages = calculateTonePercentages(
        newPosition.x,
        newPosition.y
      );
      if (percentages) {
        setTonePercentages(percentages);
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < dragHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const newPosition = dragHistory[newIndex];
      setPosition(newPosition);

      // Update tone percentages for the new position
      const percentages = calculateTonePercentages(
        newPosition.x,
        newPosition.y
      );
      if (percentages) {
        setTonePercentages(percentages);
      }
    }
  };

  return (
    <div className="w-full h-full lg:w-1/3 p-2 flex flex-col gap-1">
      {/* slider */}
      <div
        ref={sliderRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        id="slider"
        className="grow min-h-72 border rounded-md border-ring relative"
      >
        <div
          ref={dotRef}
          className="absolute cursor-move z-10"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
            touchAction: "none", // Prevent default touch behaviors
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <Dot className="w-20 h-20 text-primary" />
        </div>
        <div className="grid grid-cols-3 min-h-72">
          <div className="flex items-center justify-center w-full border border-ring text-center"></div>
          <div className="flex items-center justify-center w-full border border-ring text-center text-wrap">
            Professional
          </div>
          <div className="flex items-center justify-center w-full border border-ring text-center"></div>
          <div className="flex items-center justify-center w-full border border-ring text-center text-wrap">
            Formal
          </div>
          <div className="flex items-center justify-center w-full border border-ring text-center"></div>
          <div className="flex items-center justify-center w-full border border-ring text-center text-wrap">
            Creative
          </div>
          <div className="flex items-center justify-center w-full border border-ring text-center"></div>
          <div className="flex items-center justify-center w-full border border-ring text-center text-wrap">
            Casual
          </div>
          <div className="flex items-center justify-center w-full border border-ring text-center"></div>
        </div>
      </div>

      {/* Current coordinates and percentages */}
      <div className="text-sm text-gray-600 text-center">
        <div>
          x: {Math.round(position.x)}, y: {Math.round(position.y)}
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 mt-1">
          <span>Professional: {tonePercentages.professional}%</span>
          <span>Creative: {tonePercentages.creative}%</span>
          <span>Formal: {tonePercentages.formal}%</span>
          <span>Casual: {tonePercentages.casual}%</span>
        </div>
      </div>

      {/* undo redo */}
      <div className="flex gap-1 w-full" id="undo-redo">
        <UndoButton />
        <RedoButton />
      </div>

      {/* reset and copy */}
      <div className="flex gap-1" id="reset-copy">
        <ResetButton onClick={handleReset} />
        <CopyButton />
      </div>
    </div>
  );
};

export default Settings;
