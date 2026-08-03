import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function Providers({ children }) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}
