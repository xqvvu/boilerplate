import { Theme } from "@astryxdesign/core/theme";
import type { DefinedTheme, ThemeMode } from "@astryxdesign/core/theme";
import type { ReactNode } from "react";

import { boilerplateTheme } from "./theme";

import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "@astryxdesign/theme-neutral/theme.css";

export interface UIProviderProps {
  children: ReactNode;
  mode?: ThemeMode;
  theme?: DefinedTheme;
}

export type UIProps = UIProviderProps;

export function UIProvider({
  children,
  mode = "system",
  theme = boilerplateTheme,
}: UIProviderProps) {
  return (
    <Theme theme={theme} mode={mode}>
      {children}
    </Theme>
  );
}

export const UI = UIProvider;
