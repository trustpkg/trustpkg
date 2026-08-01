"use client";

import React from "react";
import { ThemeContext } from "@/theme/providers/ThemeProvider";

export function ChooseTheme() {
  const context = React.useContext(ThemeContext);

  return (
    <button
      onClick={() => {
        if (context) {
          const nextTheme = context.theme === "light" ? "dark" : "light";
          context.setTheme(nextTheme);
        }
      }}
    >
      {context?.theme}
    </button>
  );
}
