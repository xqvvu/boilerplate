import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";

/**
 * The product-level visual contract for the boilerplate.
 *
 * Astryx owns component behavior and semantics. This theme owns the small set
 * of decisions that make the package feel like one system: accent and motion.
 * Apps can still pass another DefinedTheme to UIProvider.
 */
export const boilerplateTheme = defineTheme({
  name: "boilerplate",
  extends: neutralTheme,

  color: {
    accent: ["#0F766E", "#5EEAD4"],
    neutralStyle: "cool",
    contrast: "standard",
  },

  motion: {
    fast: 125,
    medium: 300,
    slow: 700,
    ratio: 0.75,
  },
});
