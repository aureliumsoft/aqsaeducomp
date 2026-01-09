"use client";

import { ReactNode } from "react";
import { Navbar } from "./_compoments/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
