"use client";

import { ReactNode } from "react";
import { Navbar } from "./_compoments/Navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
}
