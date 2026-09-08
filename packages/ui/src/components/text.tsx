import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef } from "react";

import { tokens } from "../tokens/tokens.stylex";

export type TextProps = Omit<ComponentPropsWithoutRef<"p">, "style"> & {
  style?: stylex.StyleXStyles;
};

export function Text({ style, ...props }: TextProps) {
  return <p {...props} {...stylex.props(styles.text, style)} />;
}

const styles = stylex.create({
  text: {
    fontSize: tokens.bodyFontSize,
    lineHeight: tokens.bodyLineHeight,
    marginTop: tokens.bodySpacing,
  },
});
