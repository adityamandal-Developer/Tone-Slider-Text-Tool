"use client";
import React, { useState } from "react";

// Define the context type
type SharedTonePercentageContextType = {
  tonePercentage: string;
  setTonePercentage: React.Dispatch<React.SetStateAction<string>>;
};

// Create the context with proper typing
const SharedTonePercentage =
  React.createContext<SharedTonePercentageContextType>({
    tonePercentage: "",
    setTonePercentage: () => {}, // Default no-op function
  });

// Export the context so child components can use it
export const useTonePercentage = () => React.useContext(SharedTonePercentage);

type Props = {
  children: React.ReactNode;
};

const Texteditor = ({ children }: Props) => {
  const [tonePercentage, setTonePercentage] = useState("");
  return (
    <section className="h-full w-full flex flex-col lg:flex-row justify-between items-start gap-2 p-4 border rounded-md border-ring">
      <SharedTonePercentage.Provider
        value={{ tonePercentage, setTonePercentage }}
      >
        {children}
      </SharedTonePercentage.Provider>
    </section>
  );
};

export default Texteditor;
