import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef } from "react";

import { tokens } from "../tokens/tokens.stylex";

export type PageProps = Omit<ComponentPropsWithoutRef<"div">, "style"> & {
  style?: stylex.StyleXStyles;
};

export function Page({ style, ...props }: PageProps) {
  return <div {...props} {...stylex.props(styles.page, style)} />;
}

const styles = stylex.create({
  page: {
    padding: tokens.pagePadding,
  },
});
