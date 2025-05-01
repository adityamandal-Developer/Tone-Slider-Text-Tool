import React from "react";

type Props = {
  children: React.ReactNode;
};

const Texteditor = ({ children }: Props) => {
  return (
    <section className="h-full w-full flex flex-col lg:flex-row justify-between items-start gap-2 p-4 border-1 border-ring">
      {children}
    </section>
  );
};

export default Texteditor;
