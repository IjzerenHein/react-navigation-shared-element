import { TransitionSpecs } from "@react-navigation/stack";

type TransitionSpec = typeof TransitionSpecs.TransitionIOSSpec;

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
