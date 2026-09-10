import {
  borderVars,
  colorVars,
  durationVars,
  easeVars,
  focusVars,
  fontWeightVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  textSizeVars,
  typographyVars,
  typeScaleVars,
} from "@astryxdesign/core/theme/tokens.stylex";

export {
  borderVars,
  colorVars,
  durationVars,
  easeVars,
  focusVars,
  fontWeightVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  textSizeVars,
  typographyVars,
  typeScaleVars,
};

/** Token families grouped by intent for custom UI components. */
export const tokens = {
  border: borderVars,
  color: colorVars,
  duration: durationVars,
  ease: easeVars,
  focus: focusVars,
  fontWeight: fontWeightVars,
  radius: radiusVars,
  shadow: shadowVars,
  size: sizeVars,
  spacing: spacingVars,
  textSize: textSizeVars,
  typography: typographyVars,
  typeScale: typeScaleVars,
} as const;
