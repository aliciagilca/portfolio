import "./index.css";

import React from "react";
import { Toaster } from "sonner";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <Toaster />
    </main>
  );
}
