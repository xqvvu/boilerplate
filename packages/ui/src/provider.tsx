import { Theme } from "@astryxdesign/core/theme";
import type { DefinedTheme, ThemeMode } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import type { ReactNode } from "react";

import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "@astryxdesign/theme-neutral/theme.css";

export interface UIProps {
  children: ReactNode;
  mode?: ThemeMode;
  theme?: DefinedTheme;
}

export function UI({ children, mode = "system", theme = neutralTheme }: UIProps) {
  return (
    <Theme theme={theme} mode={mode}>
      {children}
    </Theme>
  );
}
