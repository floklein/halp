import { createAnimations } from "@tamagui/animations-react-native";
import { defaultConfig } from "@tamagui/config/v4";
import { createInterFont } from "@tamagui/font-inter";
import { createTamagui } from "tamagui";

const animations = createAnimations({
  fast: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  slow: {
    damping: 20,
    stiffness: 60,
  },
  bouncy: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: "spring",
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

const headingFont = createInterFont({
  weight: {
    normal: 900,
  },
});
const bodyFont = createInterFont();

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  animations,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens: {
    ...defaultConfig.tokens,
    color: {
      background: "rgb(0,0,0)",
    },
  },
  defaultProps: {
    Button: {
      disabledStyle: {
        opacity: 0.5,
      },
    },
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}
