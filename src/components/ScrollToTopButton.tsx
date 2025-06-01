// components/ScrollToTopButton.tsx
"use client";

import React from "react";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={scrollToTop} className="p-2 bg-blue-500 text-white rounded">
      Scroll to Top
    </button>
  );
}
