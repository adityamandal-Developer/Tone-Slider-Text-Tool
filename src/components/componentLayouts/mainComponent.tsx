import React from "react";

type Props = {
  children: React.ReactNode;
};

const mainComponent = ({ children }: Props) => {
  return (
    <main className="min-h-screen flex flex-col gap-2 bg-background p-4 lg:p-16 text-foreground border rounded-md border-ring">
      {children}
    </main>
  );
};

export default mainComponent;
