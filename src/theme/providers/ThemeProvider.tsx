"use client";

import type { CurrentTheme } from "@/theme/generated/themes.generated.types";
import { setTheme as setThemeRequest } from "@/theme/themeApi";
import { useRouter } from "next/navigation";
import React from "react";

interface ThemeContextType {
  theme: CurrentTheme;
  setTheme: (theme: CurrentTheme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

interface ThemeProviderProps extends React.ComponentProps<"div"> {
  theme: CurrentTheme;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { theme, children } = props;
  const router = useRouter();

  const setTheme = (nextTheme: CurrentTheme) => {
    void (async () => {
      const result = await setThemeRequest(nextTheme);

      if ("theme" in result) {
        router.refresh();
      }
    })();
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
