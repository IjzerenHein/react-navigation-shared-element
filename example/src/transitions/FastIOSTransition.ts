import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";

export const FastIOSTransitionSpec: TransitionSpec = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};
