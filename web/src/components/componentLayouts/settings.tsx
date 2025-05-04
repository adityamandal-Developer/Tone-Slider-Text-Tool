"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dot, RefreshCcw } from "lucide-react";
import { useTonePercentage } from "./text-editor-layout";
import { calculateTonePercentages } from "@/lib/calculateTone";

const Settings = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [tonePercentages, setTonePercentages] = useState({
    professional: 25,
    creative: 25,
    formal: 25,
    casual: 25,
  });

  const dotRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate tone percentages based on position
  // const calculateTonePercentages = calculateTonePercentages
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
    const percentages = calculateTonePercentages(newX, newY, sliderRef);
    if (percentages) {
      setTonePercentages(percentages);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
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
      const percentages = calculateTonePercentages(newX, newY, sliderRef);
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
    const percentages = calculateTonePercentages(newX, newY, sliderRef);
    if (percentages) {
      setTonePercentages(percentages);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
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
      const percentages = calculateTonePercentages(
        position.x,
        position.y,
        sliderRef
      );
      if (percentages) {
        setTonePercentages(percentages);
      }
    }
  }, []);

  const { setTonePercentage } = useTonePercentage();
  useEffect(() => {
    const toneString = `${tonePercentages.professional}% professional, ${tonePercentages.creative}% creative, ${tonePercentages.formal}% formal, ${tonePercentages.casual}% casual`;
    setTonePercentage(toneString);
  }, [tonePercentages, setTonePercentage]);

  const handleReset = () => {
    const newPosition = { x: 0, y: 0 };
    setPosition(newPosition);

    // Reset tone percentages
    const percentages = calculateTonePercentages(0, 0, sliderRef);
    if (percentages) {
      setTonePercentages(percentages);
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
          <div
            className="flex items-center justify-center w-full border border-ring text-center text-accent z-50"
            onClick={handleReset}
          >
            <RefreshCcw />
          </div>
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
    </div>
  );
};

export default Settings;
