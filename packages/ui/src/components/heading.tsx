import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef } from "react";

import { tokens } from "../tokens/tokens.stylex";

export type HeadingProps = Omit<ComponentPropsWithoutRef<"h1">, "style"> & {
  style?: stylex.StyleXStyles;
};

export function Heading({ style, ...props }: HeadingProps) {
  return <h1 {...props} {...stylex.props(styles.heading, style)} />;
}

const styles = stylex.create({
  heading: {
    fontSize: tokens.headingFontSize,
    fontWeight: 700,
    lineHeight: tokens.headingLineHeight,
  },
});
