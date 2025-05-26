import React, { ReactNode } from "react";

interface MainRootProps {
  children: ReactNode;
}

export default function MainRoot({ children }: MainRootProps) {
  return <main className="flex justify-center">{children}</main>;
}
