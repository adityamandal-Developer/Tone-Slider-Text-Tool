import React from "react";

type Props = {
  children: React.ReactNode;
};

const mainComponent = ({ children }: Props) => {
  return (
    <main className="h-screen flex flex-col gap-2 bg-background p-4 lg:p-16 text-foreground border-1 border-ring rounded-sm">
      {children}
    </main>
  );
};

export default mainComponent;
