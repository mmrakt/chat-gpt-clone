"use client";

import { ReactElement, createContext } from "react";
import { useMatchMedia } from "@app/_hooks/useMatchMedia";

type Theme = "light" | "dark";
type IThemeContext = {
  theme: Theme;
};

export const ThemeContext = createContext<IThemeContext>({ theme: "light" });

type IProps = {
  children: ReactElement;
};
const ThemeProvider: React.FC<IProps> = ({ children }) => {
  const theme = useMatchMedia("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
